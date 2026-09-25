import { Metadata } from "@/Actions/CreateCheckOutSessions";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not set",
      },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret as string);
  } catch (error) {
    return NextResponse.json({ error: `Failed to verify webhook signature: ${error}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice ? await stripe.invoices.retrieve(session.invoice as string) : null;
    try {
      await sendOrderToBackend(session, invoice);
    } catch (error) {
      console.error("Failed to forward order to backend:", error);
      return NextResponse.json({ error: `Failed to forward order to backend: ${error}` }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true });
}

async function sendOrderToBackend(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const { id, amount_total, currency, payment_intent, metadata, total_details } = session;
  const { customerEmail, customerName, orderNumber, addresses, clerkUserId, userId } =
    metadata as unknown as Metadata & { addresses: string; userId?: string };

  const lineItemWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  let parsedAddress = null;
  if (addresses) {
    try {
      parsedAddress = typeof addresses === "string" ? JSON.parse(addresses) : addresses;
    } catch {
      parsedAddress = null;
    }
  }
  const products = [];

  for (const item of lineItemWithProduct.data) {
    const productId = (item?.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item.quantity || 0;
    if (!productId) continue;

    products.push({
      productId,
      quantity,
      price: item.amount_total ? item.amount_total / 100 : 0,
    });
  }

  const orderPayload = {
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    userId: userId || clerkUserId || null,
    clerkUserId: clerkUserId || userId || null,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address: parsedAddress
      ? {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      console.warn("Backend order creation returned status:", response.status);
    }
  } catch (error) {
    console.error("Network error sending order to Laravel backend:", error);
  }

  return orderPayload;
}