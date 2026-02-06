"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/lib/constants";
import Model3D from "@/components/Model3D";
import { Hand, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Hero() {
    const { heroVariant, setHeroVariant, addToCart, setCheckoutItem } = useStore();
    const [localVariant, setLocalVariant] = useState(PRODUCTS.SHAKER.variants[0]);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Animation Hooks
    const { scrollY } = useScroll();

    // Model Animations: Shrink & Move Left
    // Model Animations: Shrink & Move Left (Calibrated for 2-col)
    const modelScale = useTransform(scrollY, [0, 300], [1.05, 0.85]);
    const modelX = useTransform(scrollY, [0, 300], ["50%", "0%"]); // Center -> Left Col
    const modelY = useTransform(scrollY, [0, 300], ["10%", "0%"]); // Low -> Center

    // Text Fade Out (Initial Header)
    const headerOpacity = useTransform(scrollY, [0, 150], [1, 0]);
    const headerY = useTransform(scrollY, [0, 150], [0, -50]);

    // Bottom Controls Fade Out
    const controlsOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    // Details Panel Fade In (Right Side)
    const detailsOpacity = useTransform(scrollY, [150, 300], [0, 1]);
    const detailsY = useTransform(scrollY, [150, 300], [50, 0]);


    useEffect(() => {
        setHeroVariant(localVariant);
    }, [localVariant]);

    useEffect(() => {
        if (heroVariant && heroVariant.name !== localVariant.name) {
            // @ts-ignore
            setLocalVariant(heroVariant);
        }
    }, [heroVariant]);

    const handleBuyNow = () => {
        setCheckoutItem({
            product: PRODUCTS.SHAKER,
            quantity: 1,
            variant: localVariant
        });
        router.push('/checkout');
    };

    const handleAddToCart = () => {
        addToCart({
            product: PRODUCTS.SHAKER,
            quantity: 1,
            variant: localVariant
        });
        alert("Added to cart!");
    };


    // Camera Orbit Animation (Top -> Front)
    // Starts at top-down view (phi ~ 0deg) and animates to front view (phi ~ 75deg)
    const [cameraOrbit, setCameraOrbit] = useState("0deg 20deg 105%");

    useScroll().scrollY.on("change", (latest) => {
        // Map scroll 0-300 to phi 20-75
        const progress = Math.min(Math.max(latest / 300, 0), 1);
        const startPhi = 20;
        const endPhi = 75;
        const currentPhi = startPhi + (endPhi - startPhi) * progress;
        setCameraOrbit(`0deg ${currentPhi}deg 105%`);
    });


    return (
        <section ref={containerRef} className="relative w-full h-[120vh] min-h-[1000px] z-10 bg-zinc-50 dark:bg-zinc-950">
            {/* Studio Background - Fixed */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-50 to-white dark:from-zinc-800 dark:via-zinc-900 dark:to-black z-0 pointer-events-none" />

            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* Initial Header (Fades Out) - Sent to Back (z-0) */}
                <motion.div
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="absolute top-20 left-0 right-0 text-center z-0 pointer-events-none"
                >
                    <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">
                        RugXFIT Pro Series
                    </p>
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-black dark:text-white mb-2">
                        The Shaker.
                    </h1>
                </motion.div>

                <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center h-full">

                    {/* Left Column: Model Area */}
                    <motion.div
                        style={{
                            scale: modelScale,
                            x: modelX,
                            y: modelY
                        }}
                        className="col-span-1 flex items-center justify-center h-full w-full z-20"
                    >
                        {/* Dynamic Scale Wrapper based on Variant */}
                        <motion.div
                            className="w-full h-full max-w-[500px] relative flex items-center justify-center"
                            animate={{ scale: localVariant.name.includes("750") ? 1.0 : 0.85 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Model3D
                                src="/gym_shaker_bottle.glb"
                                alt="RugXFit Premium Shaker"
                                cameraOrbit={cameraOrbit}
                            />
                            {/* Drag Hint */}
                            <motion.div
                                style={{ opacity: headerOpacity }}
                                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400 text-sm pointer-events-none"
                            >
                                <Hand className="w-4 h-4 animate-pulse" />
                                <span>Drag to rotate</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Details Panel */}
                    <motion.div
                        style={{ opacity: detailsOpacity, y: detailsY }}
                        className="col-span-1 h-full flex flex-col justify-center pl-12 hidden lg:flex z-20"
                    >
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">RugXFIT Shaker</h2>
                                <p className="text-zinc-500 text-lg font-medium mt-1">Pro Series • {localVariant.name}</p>
                            </div>

                            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                                ₹{localVariant.price}
                            </div>

                            <div className="space-y-3">
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    Engineered for the dedicated athlete. Leak-proof guarantee with a premium matte finish.
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Premium Food-Grade Stainless Steel</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Double-wall vacuum insulation</li>
                                </ul>
                            </div>

                            {/* Size Selector in Details Panel */}
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl inline-flex gap-1">
                                {PRODUCTS.SHAKER.variants.map((variant) => (
                                    <button
                                        key={variant.name}
                                        onClick={() => setLocalVariant(variant)}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${localVariant.name === variant.name
                                            ? "bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white"
                                            : "text-zinc-400 hover:text-zinc-600"
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button onClick={handleBuyNow} className="flex-1 h-12 rounded-full bg-black text-white hover:bg-zinc-800 text-base">
                                    Buy Now
                                </Button>
                                <Button variant="outline" onClick={handleAddToCart} className="flex-1 h-12 rounded-full text-base">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                </div>



            </div>
        </section>
    );
}
