"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/types";
import { urlFor } from "@/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

/**
 * Interface representing the metadata passed to the Stripe checkout session.
 * This data is used to attach context to the Stripe order webhook.
 */
export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  userId?: string;
  clerkUserId?: string;
  addresses: Address | null;
}

/**
 * Interface mapping grouped cart items with their exact quantity.
 * Used as input to define line items in Stripe.
 */
export interface GroupedItems {
  product: CartItem["product"];
  quantity: number;
}

/**
 * Creates a Stripe Checkout Session for order payment processing.
 *
 * @param items - Array of grouped cart items to be purchased.
 * @param metadata - Order context (names, addresses, IDs) to attach to the session.
 * @returns {Promise<string | null>} The secure URL to redirect the user for payment, or throws an error.
 */
export async function CreateCheckOutSessions(
  items: GroupedItems[],
  metadata: Metadata,
) {
  try {
    // 1. Attempt to find an existing Stripe customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
    });
    const customerId = customers?.data?.length > 0 ? customers?.data[0].id : "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 2. Initialize the base Stripe Session payload
    const sessionsPayload: Stripe.Checkout.SessionCreateParams = {
      // Attach business logic metadata (saved for webhooks to fulfill order)
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        userId: metadata.userId || metadata.clerkUserId || "",
        clerkUserId: metadata.clerkUserId || metadata.userId || "",
        addresses: JSON.stringify(metadata.addresses),
      },
      mode: "payment",
      allow_promotion_codes: true, // Enable features like discount coupons
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true, // Auto-generate an invoice PDF on success
      },
      // Redirect URLs
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/cart`,

      // 3. Transform our cart items into Stripe line items
      line_items: items.map((item) => ({
        price_data: {
          currency: "BDT", // Bangladeshi Taka
          // Stripe requires amounts in cents (lowest currency denominator)
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            // Parse rich text or array description to plain text if necessary
            description: item?.product?.description
              ? Array.isArray(item?.product?.description)
                ? item?.product?.description
                    .map((blocks: unknown) => {
                      if (typeof blocks === "object" && blocks !== null) {
                        const b = blocks as { _type?: string; children?: { text?: string }[] };
                        return b._type === "block"
                          ? b.children?.map((child) => child.text || "").join("") || ""
                          : "";
                      }
                      return "";
                    })
                    .join(" ")
                : String(item?.product?.description)
              : undefined,
            metadata: { id: item?.product?._id },
            // Include product image URL for the checkout page
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: item?.quantity,
      })),
    };

    // 4. Attach customer reference if found, or strictly use email for guest checkout
    if (customerId) {
      sessionsPayload.customer = customerId;
    } else {
      sessionsPayload.customer_email = metadata.customerEmail;
    }

    // 5. Yield session URL
    const session = await stripe.checkout.sessions.create(sessionsPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error; // Let the caller component handle the UI error state
  }
}
