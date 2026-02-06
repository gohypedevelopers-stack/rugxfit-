"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function ZigZagSections() {
    const { addToCart, setCheckoutItem } = useStore();
    const router = useRouter();

    const productsList = [
        {
            ...PRODUCTS.SHAKER,
            title: "The Ultimate Shaker",
            desc: "Designed for the gym, built for life. The RugXFit Shaker combines style with utility.",
            features: ["Leak-proof technology", "Odor-resistant materials", "Ergonomic grip"],
            align: "right"
        },
        {
            ...PRODUCTS.WRAPS,
            title: "Heavy Duty Wrist Wraps",
            desc: "Maximize your lifts with superior stability. Engineered for heavy pressing movements.",
            features: ["High-grade elasticity", "Reinforced thumb loop", "Industrial velcro"],
            align: "left"
        }
    ];

    const handleBuyNow = (product: any) => {
        setCheckoutItem({
            product: product,
            quantity: 1,
            variant: product.variants[0]
        });
        router.push('/checkout');
    };

    const handleAddToCart = (product: any) => {
        addToCart({
            product: product,
            quantity: 1,
            variant: product.variants[0]
        });
        alert("Added to cart!");
    };

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 space-y-32">
                {productsList.map((item, index) => (
                    <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${item.align === 'left' ? 'lg:flex-row-reverse' : ''}`}>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-4 max-w-lg" // Reduced spacing and width
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Premium Gear</span>
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                {item.title}
                            </h2>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {item.desc}
                            </p>
                            <ul className="space-y-2 pt-2">
                                {item.features.slice(0, 2).map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                                        <div className="w-1 h-1 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Optional: Minimal Learn More link instead of big buttons */}
                            <div className="pt-4">
                                <Button variant="link" className="p-0 text-zinc-900 dark:text-white h-auto font-semibold text-lg">
                                    Learn more &rarr;
                                </Button>
                            </div>
                        </motion.div>

                        {/* Image Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex-1 w-full"
                        >
                            <div className="relative aspect-square w-full max-w-[600px] mx-auto bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden p-0 shadow-lg" >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                ))}
            </div>
        </section>
    );
}
