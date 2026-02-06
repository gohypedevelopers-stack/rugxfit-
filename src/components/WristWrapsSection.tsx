"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/lib/constants";
import Model3D from "@/components/Model3D";
import { Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WristWrapsSection() {
    const { addToCart, setCheckoutItem } = useStore();
    // Wraps only has one variant for now, but keeping structure consistent
    const [localVariant, setLocalVariant] = useState(PRODUCTS.WRAPS.variants[0]);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within this specific section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animation range: Perform the transition in the first ~40% of the section scroll
    // This allows the user to scroll "through" the animation.

    // Model Animations:
    // Starts "centered" (shifted left from right col) then moves to natural position (0%)
    const modelScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 0.9]);
    const modelX = useTransform(scrollYProgress, [0, 0.4], ["-50%", "0%"]); // Center (shifted left) -> Right Col (natural)
    const modelY = useTransform(scrollYProgress, [0, 0.4], ["10%", "0%"]);

    // Text Overlay Fade Out (Initial "Teaser")
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Details Panel Fade In (Left Side)
    const detailsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const detailsY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);


    const handleBuyNow = () => {
        setCheckoutItem({
            product: PRODUCTS.WRAPS,
            quantity: 1,
            variant: localVariant
        });
        router.push('/checkout');
    };

    const handleAddToCart = () => {
        addToCart({
            product: PRODUCTS.WRAPS,
            quantity: 1,
            variant: localVariant
        });
        alert("Added to cart!");
    };


    return (
        // Increased height to 250vh to give scroll space for the animation
        <section ref={containerRef} className="relative w-full h-[250vh] z-10 bg-zinc-50 dark:bg-zinc-950">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* Initial Header (Fades Out) */}
                <motion.div
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="absolute top-20 left-0 right-0 text-center z-10 pointer-events-none"
                >
                    <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">
                        RugXFIT Pro Gear
                    </p>
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-black dark:text-white mb-2">
                        Wrist Wraps.
                    </h1>
                </motion.div>

                <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center h-full">

                    {/* Left Column: Details Panel (Animated In) */}
                    {/* ORDER: 1 on mobile, but flex order might vary. Default grid puts this first. */}
                    <div className="col-span-1 h-full flex flex-col justify-center pr-12 z-20 order-2 lg:order-1">
                        <motion.div
                            style={{ opacity: detailsOpacity, y: detailsY }}
                            className="space-y-6 hidden lg:block"
                        >
                            <div>
                                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Heavy Duty Wraps</h2>
                                <p className="text-zinc-500 text-lg font-medium mt-1">Pro Series • {localVariant.name}</p>
                            </div>

                            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                                ₹{localVariant.price}
                            </div>

                            <div className="space-y-3">
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    Maximize your lifts with superior stability. Engineered for heavy pressing movements.
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Industrial Strength Velcro</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Reinforced Thumb Loop</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Maximum Joint Stability</li>
                                </ul>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button onClick={handleBuyNow} className="flex-1 h-12 rounded-full bg-black text-white hover:bg-zinc-800 text-base">
                                    Buy Now
                                </Button>
                                <Button variant="outline" onClick={handleAddToCart} className="flex-1 h-12 rounded-full text-base">
                                    Add to Cart
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Model Area */}
                    <motion.div
                        style={{
                            scale: modelScale,
                            x: modelX,
                            y: modelY
                        }}
                        className="col-span-1 flex items-center justify-center h-full w-full z-20 order-1 lg:order-2"
                    >
                        {/* Dynamic Scale Wrapper */}
                        <motion.div
                            className="w-full h-full max-w-[500px] relative flex items-center justify-center"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Model3D
                                src="/wrist_wraps.glb"
                                alt="RugXFit Wrist Wraps"
                                loading="lazy"
                            />

                            {/* Drag Hint (Fades out with header) */}
                            <motion.div
                                style={{ opacity: headerOpacity }}
                                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400 text-sm pointer-events-none"
                            >
                                <Hand className="w-4 h-4 animate-pulse" />
                                <span>Drag to rotate</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
