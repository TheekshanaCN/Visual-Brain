export const CREDIT_PLANS = {
    pg_starter: {
        priceId: process.env.STRIPE_STARTER_PRICE_ID!,
        credits: 500,
    },
    pg_pro: {
        priceId: process.env.STRIPE_PRO_PRICE_ID!,
        credits: 1200,
    },
    pg_power: {
        priceId: process.env.STRIPE_POWER_PRICE_ID!,
        credits: 5000,
    },
} as const;

export type CreditPlanId = keyof typeof CREDIT_PLANS;
