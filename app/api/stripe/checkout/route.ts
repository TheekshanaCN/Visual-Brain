import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCurrentUser } from '@/app/actions/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { credits, amount } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${credits} Credits`,
                            description: `Purchase ${credits} credits for IdeaForge`,
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
            metadata: {
                userId: user.workosId,
                credits: credits.toString(),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[STRIPE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
