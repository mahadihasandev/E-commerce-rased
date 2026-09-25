import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

// Global instance of the Stripe SDK
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

export default stripe;
