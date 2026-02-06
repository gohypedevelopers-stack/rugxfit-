"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Minus, Plus } from "lucide-react";

export default function ProductDrawer() {
    const { isProductDrawerOpen, closeProductDrawer, selectedProduct, setCheckoutItem } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (selectedProduct) {
            setQuantity(1);
            if (selectedProduct.variants && selectedProduct.variants.length > 0) {
                setSelectedVariant(selectedProduct.variants[0]);
            } else {
                setSelectedVariant(null);
            }
        }
    }, [selectedProduct]);

    if (!selectedProduct) return null;

    const handleBuyNow = () => {
        setCheckoutItem({
            product: selectedProduct,
            quantity,
            variant: selectedVariant
        });
        closeProductDrawer();
        router.push('/checkout');
    };

    const currentPrice = selectedVariant ? selectedVariant.price : selectedProduct.price;

    return (
        <Sheet open={isProductDrawerOpen} onOpenChange={(open) => !open && closeProductDrawer()}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold">{selectedProduct.name}</SheetTitle>
                    <SheetDescription>
                        {selectedProduct.description}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    {/* Image */}
                    <div className="relative w-full h-64 mb-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center p-4">
                        <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            width={200}
                            height={300}
                            className="object-contain max-h-full"
                        />
                    </div>

                    {/* Variants */}
                    {selectedProduct.variants && (
                        <div className="mb-8">
                            <h4 className="text-sm font-medium mb-3 text-zinc-500 uppercase tracking-wider">Select Option</h4>
                            <div className="flex gap-3">
                                {selectedProduct.variants.map((variant) => (
                                    <button
                                        key={variant.name}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${selectedVariant?.name === variant.name
                                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                                            : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300"
                                            }`}
                                    >
                                        <span className="block text-sm">{variant.name}</span>
                                        <span className="block text-xs opacity-80">₹{variant.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-8">
                        <h4 className="text-sm font-medium mb-3 text-zinc-500 uppercase tracking-wider">Quantity</h4>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline" size="icon" className="rounded-full h-10 w-10"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                            <Button
                                variant="outline" size="icon" className="rounded-full h-10 w-10"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer actions */}
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span>₹{currentPrice * quantity}</span>
                    </div>
                    <Button className="w-full text-lg h-14 rounded-full" onClick={handleBuyNow}>
                        Checkout - ₹{currentPrice * quantity}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
