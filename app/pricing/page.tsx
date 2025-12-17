"use client";

import { Check, Coins, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/pricing/Navbar';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plan, fetchPricingPlans, handleCheckout, getSignInUrl } from "@/lib/pricing-client";

export default function PricingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await fetchPricingPlans();
                setPlans(data);
            } catch (error) {
                console.error("Failed to fetch pricing plans", error);
                toast.error("Failed to load pricing plans");
            } finally {
                setIsLoadingPlans(false);
            }
        };

        fetchPlans();
    }, []);

    const handlePurchase = async (plan: Plan) => {
        setLoading(plan.name);

        try {
            const { url } = await handleCheckout(plan.planId);
            window.location.href = url;
        } catch (err) {
            // Check if it's an auth error
            if (err instanceof Error && err.message === "UNAUTHORIZED") {
                toast.error("Please sign in to purchase credits.");
                try {
                    const { url } = await getSignInUrl();
                    window.location.href = url;
                } catch (signInError) {
                    toast.error("Failed to redirect to sign in page");
                    console.error("Sign in redirect failed:", signInError);
                }
            } else {
                toast.error("Failed to process checkout. Please try again.");
                console.error("Checkout error:", err);
            }
        } finally {
            setLoading(null);
        }
    };

    if (isLoadingPlans) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-6">
                        <Sparkles className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">Pay as you go</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 tracking-tight">
                        Simple Pricing
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Purchase credits when you need them. No subscriptions, no commitments, no hidden fees.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`relative flex flex-col border transition-all duration-300 hover:shadow-lg ${plan.popular
                                ? 'border-primary/20 shadow-md bg-card'
                                : 'border-border/50 hover:border-border bg-card/50'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                                        <Sparkles className="w-3 h-3" />
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <CardHeader className="pb-8 pt-8">
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-xl font-semibold text-foreground">
                                        {plan.name}
                                    </CardTitle>
                                    <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                                        <Coins className="w-3.5 h-3.5" />
                                        <span className="text-xs font-medium">{plan.credits}</span>
                                    </div>
                                </div>
                                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 pb-8">
                                {/* Price Display */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-5xl font-bold text-foreground tracking-tight">
                                            ${plan.price}
                                        </span>
                                        <span className="text-base text-muted-foreground font-medium">USD</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {(plan.price / plan.credits * 100).toFixed(2)}¢ per credit
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                                        What's included
                                    </p>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm">
                                                <div className="mt-0.5 flex-shrink-0">
                                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                                    </div>
                                                </div>
                                                <span className="text-foreground/80 leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0 pb-8">
                                <Button
                                    className={plan.popular ? "w-full h-11 font-medium cursor-pointer" : "w-full h-11 font-medium bg-background/10 border border-white text-white hover:text-white hover:bg-background cursor-pointer"}
                                    variant={plan.popular ? "default" : "default"}
                                    onClick={() => handlePurchase(plan)}
                                    disabled={loading === plan.name}
                                >
                                    {loading === plan.name ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Coins className="w-4 h-4 mr-2" />
                                            Purchase Credits
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="max-w-4xl mx-auto mt-16 text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Credits never expire. Use them at your own pace. Need help choosing?
                        <span className="text-foreground font-medium"> Contact our support team.</span>
                    </p>
                </div>
            </div>
        </>
    );
}