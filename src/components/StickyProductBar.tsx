"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export default function StickyProductBar() {
    const [isVisible, setIsVisible] = useState(false);
    const { heroVariant, setHeroVariant, addToCart, setCheckoutItem } = useStore();
    const router = useRouter();

    // Safe fallback variant if store is empty (though Hero should set it)
    const currentVariant = heroVariant || PRODUCTS.SHAKER.variants[0];

    useEffect(() => {
        const handleScroll = () => {
            // Show when scrolled past 15% of viewport height (approx end of immediate hero view)
            const threshold = window.innerHeight * 0.15;
            setIsVisible(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBuyNow = () => {
        // Ensure we have a valid variant (with ID)
        const variantToBuy = {
            ...currentVariant,
            id: currentVariant.id || 1 // Fallback ID if missing
        };

        setCheckoutItem({
            product: PRODUCTS.SHAKER,
            quantity: 1,
            variant: variantToBuy
        });
        router.push('/checkout');
    };

    const handleAddToCart = () => {
        const variantToBuy = {
            ...currentVariant,
            id: currentVariant.id || 1
        };

        addToCart({
            product: PRODUCTS.SHAKER,
            quantity: 1,
            variant: variantToBuy
        });
        alert("Added to cart!");
    };


    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-0 right-0 z-50 mx-4 md:mx-auto max-w-4xl"
                >
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">

                        {/* Left: Info + selector */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="hidden md:block w-12 h-12 relative bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                                {/* Using static image for thumbnail */}
                                <img src={PRODUCTS.SHAKER.image} alt="Thumb" className="w-full h-full object-contain p-1" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm md:text-base text-zinc-900 dark:text-white">RugXFIT Shaker</h3>
                                <p className="text-xs text-zinc-500">₹{currentVariant.price} • {currentVariant.name}</p>
                            </div>

                            {/* Integration: Sync size selector */}
                            <div className="ml-auto md:ml-4 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg flex">
                                {PRODUCTS.SHAKER.variants.map((v) => (
                                    <button
                                        key={v.name}
                                        onClick={() => setHeroVariant(v)}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${currentVariant.name === v.name
                                            ? "bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white"
                                            : "text-zinc-500 hover:text-black dark:hover:text-white"
                                            }`}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button
                                variant="outline"
                                className="flex-1 md:flex-none rounded-full"
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add
                            </Button>
                            <Button
                                className="flex-1 md:flex-none rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
