import dbConnect from './db';
import AdminCreditSettings, { IAdminCreditSettings } from '@/models/AdminCreditSettings';
import AdminPricingSettings, { IAdminPricingSettings } from '@/models/AdminPricingSettings';

export async function getAdminCreditSettings(): Promise<IAdminCreditSettings> {
    await dbConnect();

    let settings = await AdminCreditSettings.findOne({});

    if (!settings) {
        settings = await AdminCreditSettings.create({
            defaultUserCredits: 500,
            mapGenerationCost: 10,
            cardGenerationCost: 5,
        });
    }

    return settings;
}

export async function getAdminPricingSettings(): Promise<IAdminPricingSettings> {
    await dbConnect();

    let settings = await AdminPricingSettings.findOne({});

    if (!settings) {
        // Seed default plans
        settings = await AdminPricingSettings.create({
            plans: [
                {
                    name: "Starter",
                    credits: 500,
                    price: 5,
                    description: "Perfect for trying out the platform",
                    features: ["500 Credits", "Access to all features", "Standard support"],
                },
                {
                    name: "Pro",
                    credits: 1200,
                    price: 10,
                    popular: true,
                    description: "Best value for regular users",
                    features: ["1200 Credits", "Access to all features", "Priority support", "Bonus 200 credits"],
                },
                {
                    name: "Power",
                    credits: 5000,
                    price: 35,
                    description: "For heavy power users",
                    features: ["5000 Credits", "Access to all features", "24/7 Priority support", "Bonus 1000 credits"],
                },
            ]
        });
    }

    return settings;
}
