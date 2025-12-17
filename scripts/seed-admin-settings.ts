import 'dotenv/config';
import dbConnect from '@/lib/db';
import AdminCreditSettings from '@/models/AdminCreditSettings';
import AdminPricingSettings from '@/models/AdminPricingSettings';

async function seed() {
    await dbConnect();

    const creditExists = await AdminCreditSettings.findOne({});
    if (!creditExists) {
        await AdminCreditSettings.create({
            defaultUserCredits: 500,
            mapGenerationCost: 100,
            cardGenerationCost: 50,
        });
        console.log('✅ Credit settings seeded');
    }

    const pricingExists = await AdminPricingSettings.findOne({});
    if (!pricingExists) {
        await AdminPricingSettings.create({
            plans: [
                {
                    name: "Starter",
                    planId: "pg_starter",
                    credits: 500,
                    price: 5,
                    description: "Perfect for trying out the platform",
                    features: ["500 Credits", "Access to all features", "Standard support"],
                },
                {
                    name: "Pro",
                    planId: "pg_pro",
                    credits: 1200,
                    price: 10,
                    popular: true,
                    description: "Best value for regular users",
                    features: ["1200 Credits", "Access to all features", "Priority support", "Bonus 200 credits"],
                },
                {
                    name: "Power",
                    planId: "pg_power",
                    credits: 5000,
                    price: 35,
                    description: "For heavy power users",
                    features: ["5000 Credits", "Access to all features", "24/7 Priority support", "Bonus 1000 credits"],
                },
            ],
        });
        console.log('✅ Pricing plans seeded');
    }

    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
