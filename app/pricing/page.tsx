"use client";

import { Check, Coins, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Plan {
    name: string;
    credits: number;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
}

export default function PricingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch('/api/pricing');
                if (res.ok) {
                    const data = await res.json();
                    setPlans(data);
                }
            } catch (error) {
                console.error("Failed to fetch pricing plans", error);
            } finally {
                setIsLoadingPlans(false);
            }
        };

        fetchPlans();
    }, []);

    const handlePurchase = async (plan: Plan) => {
        try {
            setLoading(plan.name);
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    credits: plan.credits,
                    amount: plan.price,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to start checkout");
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    if (isLoadingPlans) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Purchase credits as you go. No subscriptions, no hidden fees.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                        {plan.popular && (
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
                                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Coins className="size-5 text-primary" />
                                {plan.name}
                            </CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">${plan.price}</span>
                                <span className="text-muted-foreground"> / {plan.credits} credits</span>
                            </div>
                            <ul className="space-y-2">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                                        <Check className="size-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                onClick={() => handlePurchase(plan)}
                                disabled={loading === plan.name}
                            >
                                {loading === plan.name ? "Processing..." : "Buy Credits"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
