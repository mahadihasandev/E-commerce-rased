"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/types";
import { urlFor } from "@/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

/**
 * Interface representing the metadata passed to the checkout session.
 */
export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  userId?: string;
  clerkUserId?: string;
  addresses: Address | null;
  paymentMethod?: "demo_pay" | "cod" | "stripe" | string;
}

/**
 * Interface mapping grouped cart items with their exact quantity.
 */
export interface GroupedItems {
  product: CartItem["product"];
  quantity: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

/**
 * Creates either a simulated demo order session or a real Stripe Checkout Session.
 *
 * Defaults to instant mock checkout if Stripe keys are not configured,
 * ensuring users and recruiters can test the full e-commerce checkout flow seamlessly.
 */
export async function CreateCheckOutSessions(
  items: GroupedItems[],
  metadata: Metadata,
): Promise<string> {
  const isRealStripeConfigured =
    process.env.STRIPE_SECRET_KEY &&
    !process.env.STRIPE_SECRET_KEY.includes("placeholder") &&
    process.env.ENABLE_REAL_STRIPE === "true";

  // Use real Stripe ONLY if requested and valid keys are active
  if (metadata.paymentMethod === "stripe" && isRealStripeConfigured) {
    return createStripeSession(items, metadata);
  }

  // Fallback / Default: Instant Demo / Mock Payment Gateway
  return createMockOrderSession(items, metadata);
}

/**
 * Simulated Instant Mock Payment Processor.
 * Posts the order directly to the database API and redirects to /success.
 */
async function createMockOrderSession(
  items: GroupedItems[],
  metadata: Metadata,
): Promise<string> {
  const totalPrice = items.reduce(
    (sum, item) =>
      sum + (Number(item?.product?.price) || 0) * (item?.quantity || 1),
    0,
  );

  const mockSessionId = `mock_session_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(
    100000 + Math.random() * 900000,
  )}`;

  const products = items.map((item) => ({
    productId: item?.product?.id || item?.product?._id,
    product_id: item?.product?.id || item?.product?._id,
    quantity: item?.quantity || 1,
    price: Number(item?.product?.price) || 0,
    name: item?.product?.name || "Product",
  }));

  const orderPayload = {
    orderNumber: metadata.orderNumber,
    customerName: metadata.customerName || "Valued Customer",
    email: metadata.customerEmail,
    totalPrice: totalPrice,
    user_id: metadata.userId || metadata.clerkUserId || null,
    amountDiscount: 0,
    currency: "BDT",
    status: metadata.paymentMethod === "cod" ? "pending" : "paid",
    stripeCheckoutSessionId: mockSessionId,
    stripeCustomerId: metadata.customerEmail,
    stripePaymentIntentId: `pi_mock_${Date.now()}`,
    invoice: {
      id: `inv_mock_${Date.now()}`,
      number: invoiceNumber,
      hosted_invoice_url: null,
    },
    address: metadata.addresses
      ? {
          name: metadata.addresses.name || metadata.customerName,
          email: metadata.addresses.email || metadata.customerEmail,
          address: metadata.addresses.address,
          city: metadata.addresses.city,
          District: metadata.addresses.District || "",
          state: metadata.addresses.state || "",
          zip: metadata.addresses.zip || "",
          phone: metadata.addresses.phone || "",
        }
      : {
          name: metadata.customerName || "Customer",
          email: metadata.customerEmail,
          address: "Standard Shipping Address",
          city: "Dhaka",
          District: "Dhaka",
          state: "Dhaka",
          zip: "1200",
          phone: "+8801700000000",
        },
    products: products,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(orderPayload),
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Backend order creation warning:", await res.text());
    }
  } catch (error) {
    console.error("Error sending mock order to backend:", error);
  }

  // Artificial brief verification delay (500ms) for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  return `${baseUrl}/success?session_id=${mockSessionId}&orderNumber=${metadata.orderNumber}`;
}

/**
 * Real Stripe Session Handler (dormant until real keys are provided).
 */
async function createStripeSession(
  items: GroupedItems[],
  metadata: Metadata,
): Promise<string> {
  const customers = await stripe.customers.list({
    email: metadata.customerEmail,
  });
  const customerId = customers?.data?.length > 0 ? customers?.data[0].id : "";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const sessionsPayload: Stripe.Checkout.SessionCreateParams = {
    metadata: {
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
      userId: metadata.userId || metadata.clerkUserId || "",
      clerkUserId: metadata.clerkUserId || metadata.userId || "",
      addresses: JSON.stringify(metadata.addresses),
    },
    mode: "payment",
    allow_promotion_codes: true,
    payment_method_types: ["card"],
    invoice_creation: {
      enabled: true,
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
    cancel_url: `${baseUrl}/cart`,
    line_items: items.map((item) => ({
      price_data: {
        currency: "BDT",
        unit_amount: Math.round(item.product.price! * 100),
        product_data: {
          name: item?.product?.name || "Unknown Product",
          description: item?.product?.description
            ? Array.isArray(item?.product?.description)
              ? item?.product?.description
                  .map((blocks: unknown) => {
                    if (typeof blocks === "object" && blocks !== null) {
                      const b = blocks as {
                        _type?: string;
                        children?: { text?: string }[];
                      };
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
          images:
            item?.product?.images && item?.product?.images?.length > 0
              ? [urlFor(item?.product?.images[0]).url()]
              : undefined,
        },
      },
      quantity: item?.quantity,
    })),
  };

  if (customerId) {
    sessionsPayload.customer = customerId;
  } else {
    sessionsPayload.customer_email = metadata.customerEmail;
  }

  const session = await stripe.checkout.sessions.create(sessionsPayload);
  return session.url || `${baseUrl}/cart`;
}
