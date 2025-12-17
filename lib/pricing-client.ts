// lib/pricing-client.ts

export interface Plan {
    name: string;
    credits: number;
    planId: string;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    _id?: string;
}

// Fetch pricing plans for the UI
export async function fetchPricingPlans(): Promise<Plan[]> {
    try {
        const res = await fetch('/api/pricing');
        if (!res.ok) {
            throw new Error(`Failed to fetch pricing plans: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch pricing plans", error);
        return []; // Return empty array as fallback
    }
}

// Handle checkout process
export async function handleCheckout(planId: string): Promise<{ url: string }> {
    const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
    });

    if (response.status === 401) {
        throw new Error("UNAUTHORIZED"); // Special error for auth
    }

    if (!response.ok) {
        throw new Error("Checkout failed");
    }

    return response.json();
}

// Get sign in URL for redirect
export async function getSignInUrl(): Promise<{ url: string }> {
    const response = await fetch("/api/auth/signin-url");

    if (!response.ok) {
        throw new Error("Failed to get sign in URL");
    }

    return response.json();
}