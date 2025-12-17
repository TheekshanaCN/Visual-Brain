//api/stripe/checkout/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCurrentUser } from '@/app/actions/auth';
import { getCreditPlan } from '@/lib/server/credit-plans';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        let user;
        try {
            user = await getCurrentUser();
        } catch (authError) {
            console.error('[AUTH_ERROR]', authError);
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // only accept planId
        const { planId } = await req.json();

        const selectedPlan = await getCreditPlan(planId);
        if (!selectedPlan) {
            return new NextResponse('Invalid plan', { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: selectedPlan.priceId,
                    quantity: 1,
                },
            ],
            client_reference_id: user.workosId,
            metadata: {
                credits: selectedPlan.credits.toString(),
                planId,
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=false`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[STRIPE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
