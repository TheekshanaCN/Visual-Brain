"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export function OutOfCreditsModal() {
    const router = useRouter();
    const { isOutOfCreditsModalOpen, setOutOfCreditsModalOpen } = useStore();

    const handleOpenChange = (open: boolean) => {
        setOutOfCreditsModalOpen(open);
    };

    return (
        <Dialog open={isOutOfCreditsModalOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Out of Credits</DialogTitle>
                    <DialogDescription>
                        You have run out of credits. Please upgrade your plan or purchase more credits to continue using AI features.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button variant="outline" onClick={() => handleOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleOpenChange(false);
                        router.push("/pricing");
                    }}>
                        Get More Credits
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
