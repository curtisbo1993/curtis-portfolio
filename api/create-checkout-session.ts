// /api/create-checkout-session.ts
import Stripe from "stripe";

// ↓ remove apiVersion entirely to avoid TS type mismatch
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { amount, description } = req.body || {};
    if (!amount || !description) {
      res.status(400).json({ error: "Missing amount/description" });
      return;
    }

    const origin =
      (req.headers?.origin as string) ||
      process.env.BASE_URL ||
      "https://cb-designconsultants.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: description },
            unit_amount: amount, // cents
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/services`,
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Stripe error" });
  }
}
