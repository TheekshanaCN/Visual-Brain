import connectDB from '@/lib/db';
import CreditPlan, { ICreditPlan } from '@/models/CreditPlan';

// Cache for credit plans to avoid frequent database queries
let cachedPlans: Map<string, { priceId: string; credits: number }> | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all credit plans from the database and cache them
 */
async function fetchCreditPlans(): Promise<Map<string, { priceId: string; credits: number }>> {
    const now = Date.now();

    // Return cached plans if still valid
    if (cachedPlans && (now - cacheTime) < CACHE_DURATION) {
        return cachedPlans;
    }

    await connectDB();

    const plans = await CreditPlan.find({}).lean<ICreditPlan[]>();

    // Convert to Map for easy lookup
    const plansMap = new Map<string, { priceId: string; credits: number }>();

    plans.forEach(plan => {
        plansMap.set(plan.planId, {
            priceId: plan.priceId,
            credits: plan.credits
        });
    });

    // Update cache
    cachedPlans = plansMap;
    cacheTime = now;

    return plansMap;
}

/**
 * Get a specific credit plan by planId
 */
export async function getCreditPlan(planId: string): Promise<{ priceId: string; credits: number } | null> {
    const plans = await fetchCreditPlans();
    return plans.get(planId) || null;
}

/**
 * Get all credit plans as an object (similar to the old CREDIT_PLANS format)
 */
export async function getAllCreditPlans(): Promise<Record<string, { priceId: string; credits: number }>> {
    const plans = await fetchCreditPlans();
    const plansObject: Record<string, { priceId: string; credits: number }> = {};

    plans.forEach((value, key) => {
        plansObject[key] = value;
    });

    return plansObject;
}

/**
 * Clear the cache (useful for testing or after updates)
 */
export function clearCreditPlansCache(): void {
    cachedPlans = null;
    cacheTime = 0;
}
