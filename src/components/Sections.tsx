"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/lib/constants";
import { ArrowRight, Check } from "lucide-react";

export function ProductHighlight() {
    const { openProductDrawer } = useStore();

    return (
        <section id="wraps" className="py-24 px-6 bg-white dark:bg-black">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
            >
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center gap-12">
                    {/* Image (Left) */}
                    <div className="flex-1 relative w-full h-[300px] lg:h-[400px]">
                        <Image
                            src={PRODUCTS.WRAPS.image}
                            alt="Wrist Wraps"
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Content (Right) */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <span className="text-orange-500 font-bold tracking-wider text-sm uppercase">New Arrival</span>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Wrist Support <br /> for Heavy Lifting
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">
                            Durable wrist wraps provide superior support for intense workouts. Engineered for stability, comfort, and max performance.
                        </p>
                        <div className="flex gap-4 justify-center lg:justify-start pt-4">
                            <Button
                                size="lg"
                                className="rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
                                onClick={() => openProductDrawer(PRODUCTS.WRAPS)}
                            >
                                Buy Now
                            </Button>
                            <Button variant="ghost" className="rounded-full gap-2" onClick={() => openProductDrawer(PRODUCTS.WRAPS)}>
                                Learn More <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export function CompareSection() {
    const { openProductDrawer } = useStore();

    return (
        <section className="relative z-30 py-24 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Which RugXFIT gear is right for you?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Card 1: Shaker */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                    >
                        <h3 className="text-2xl font-bold mb-2">RugXFIT Shaker</h3>
                        <p className="text-sm text-zinc-500 mb-6">The ultimate hydration companion.</p>

                        <div className="relative w-48 h-48 mb-8">
                            <Image src={PRODUCTS.SHAKER.image} alt="Shaker" fill className="object-contain" />
                        </div>

                        <ul className="space-y-3 mb-8 text-sm text-zinc-600 dark:text-zinc-300 flex-1">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" /> 300ml and 750ml variants</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" /> Leak-proof design</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" /> Built-in mixing ball</li>
                        </ul>

                        <div className="flex items-center justify-between w-full pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <span className="text-xl font-bold">₹{PRODUCTS.SHAKER.price}</span>
                            <Button onClick={() => openProductDrawer(PRODUCTS.SHAKER)} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6">
                                Select
                            </Button>
                        </div>
                    </motion.div>

                    {/* Card 2: Wraps */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                    >
                        <h3 className="text-2xl font-bold mb-2">RugXFIT Wraps</h3>
                        <p className="text-sm text-zinc-500 mb-6">Support for your heaviest lifts.</p>

                        <div className="relative w-48 h-48 mb-8">
                            <Image src={PRODUCTS.WRAPS.image} alt="Wraps" fill className="object-contain" />
                        </div>

                        <ul className="space-y-3 mb-8 text-sm text-zinc-600 dark:text-zinc-300 flex-1">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" /> Adjustable wrist support</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" /> Heavy duty stitching</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" /> Thumb loop stability</li>
                        </ul>

                        <div className="flex items-center justify-between w-full pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <span className="text-xl font-bold">₹{PRODUCTS.WRAPS.price}</span>
                            <Button onClick={() => openProductDrawer(PRODUCTS.WRAPS)} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6">
                                Select
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mt-12">
                    <Button variant="link" className="text-blue-500 hover:text-blue-600">
                        Compare all RugXFIT products &gt;
                    </Button>
                </div>
            </div>
        </section>
    );
}
