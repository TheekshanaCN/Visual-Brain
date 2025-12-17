//api/stripe/webhook/route.ts

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getCreditPlan } from "@/lib/server/credit-plans";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("❌ Webhook signature verification failed:", err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log("✅ Stripe Event:", event.type);

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.client_reference_id;
        const planId = session.metadata?.planId;

        if (!userId || !planId) {
            console.error("❌ Missing userId or planId");
            return new NextResponse("Invalid session metadata", { status: 400 });
        }

        const plan = await getCreditPlan(planId);

        if (!plan) {
            console.error("❌ Invalid planId:", planId);
            return new NextResponse("Unknown planId", { status: 400 });
        }

        // ✅ Verify Stripe price matches the plan
        const lineItemPriceId = (session as any).line_items?.[0]?.price?.id;
        if (lineItemPriceId && lineItemPriceId !== plan.priceId) {
            console.error(`❌ Price mismatch: Stripe price ${lineItemPriceId} !== plan price ${plan.priceId}`);
            return new NextResponse("Price verification failed", { status: 400 });
        }

        const credits = plan.credits;

        const { addCredits } = await import("@/lib/user-utils");
        const success = await addCredits(userId, credits);

        if (success) {
            console.log(`✅ Added ${credits} credits to user ${userId} (${planId})`);
        } else {
            console.error(`❌ Failed to add credits to user ${userId}`);
        }
    }

    return new NextResponse("Webhook received", { status: 200 });
}
