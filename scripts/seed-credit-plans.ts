import 'dotenv/config';
import connectDB from '../lib/db';
import CreditPlan from '../models/CreditPlan';

async function seedCreditPlans() {
    try {
        console.log('🔄 Connecting to database...');
        await connectDB();
        console.log('✅ Connected to database');

        const plans = [
            {
                planId: 'pg_starter',
                priceId: process.env.STRIPE_STARTER_PRICE_ID!,
                credits: 500,
            },
            {
                planId: 'pg_pro',
                priceId: process.env.STRIPE_PRO_PRICE_ID!,
                credits: 1200,
            },
            {
                planId: 'pg_power',
                priceId: process.env.STRIPE_POWER_PRICE_ID!,
                credits: 5000,
            },
        ];

        console.log('🔄 Seeding credit plans...');

        for (const plan of plans) {
            const result = await CreditPlan.findOneAndUpdate(
                { planId: plan.planId },
                plan,
                { upsert: true, new: true }
            );
            console.log(`✅ Seeded plan: ${plan.planId} (${plan.credits} credits, priceId: ${plan.priceId})`);
        }

        console.log('\n✅ All credit plans seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding credit plans:', error);
        process.exit(1);
    }
}

seedCreditPlans();
