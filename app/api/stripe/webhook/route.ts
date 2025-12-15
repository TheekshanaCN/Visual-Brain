import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { addCredits } from '@/lib/user-utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        if (!session?.metadata?.userId || !session?.metadata?.credits) {
            return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
        }

        await addCredits(
            session.metadata.userId,
            parseInt(session.metadata.credits)
        );
    }

    return new NextResponse(null, { status: 200 });
}
