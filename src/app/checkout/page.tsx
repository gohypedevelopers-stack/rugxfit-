"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
    const { checkoutItem } = useStore();
    const [address, setAddress] = useState({ line1: "", city: "", zip: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/checkout");
        }
        if (!checkoutItem) {
            // If no item, redirect home
            router.push("/");
        }
    }, [checkoutItem, router]);

    if (!checkoutItem) return null;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            // Create Order
            let realVariantId = 1;

            if (checkoutItem.variant?.id) {
                realVariantId = checkoutItem.variant.id;
            } else {
                // Fallback logic for safety (though store should have IDs now)
                if (checkoutItem.product.id === 1) { // Shaker
                    if (checkoutItem.variant?.name === "750ml") realVariantId = 2;
                    else realVariantId = 1;
                } else {
                    realVariantId = 3; // Wraps
                }
            }

            const orderData = {
                items: [
                    { variantId: realVariantId, quantity: checkoutItem.quantity }
                ],
                total: (checkoutItem.variant?.price || checkoutItem.product.price) * checkoutItem.quantity,
                address
            };

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Mock Payment Success
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/create`, {}); // Mock call

            router.push(`/account/orders/${res.data.id}`);

        } catch (error) {
            console.error(error);
            alert("Payment processing failed.");
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = (checkoutItem.variant?.price || checkoutItem.product.price) * checkoutItem.quantity;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Navbar />
            <div className="max-w-4xl mx-auto pt-24 px-6 pb-12">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Form */}
                    <div>
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Address Line 1</Label>
                                    <Input required value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="123 Gym St" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>ZIP Code</Label>
                                        <Input required value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} placeholder="10001" />
                                    </div>
                                </div>
                            </form>
                        </Card>

                        <Card className="mt-6 p-6">
                            <h2 className="text-xl font-semibold mb-4">Payment</h2>
                            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg flex items-center gap-3 border border-zinc-200 dark:border-zinc-800">
                                <div className="w-10 h-6 bg-gray-300 rounded" />
                                <span className="text-sm font-medium">Credit Card (Mock)</span>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Summary */}
                    <div>
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-lg border border-zinc-100 dark:border-zinc-800">
                            <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

                            <div className="flex gap-4 mb-6">
                                <div className="relative w-20 h-20 bg-zinc-50 rounded-lg shrink-0">
                                    <Image src={checkoutItem.product.image} alt={checkoutItem.product.name} fill className="object-contain p-2" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">{checkoutItem.product.name}</h4>
                                    <p className="text-sm text-zinc-500">Variant: {checkoutItem.variant?.name || "Standard"}</p>
                                    <p className="text-sm text-zinc-500">Qty: {checkoutItem.quantity}</p>
                                </div>
                                <div className="ml-auto font-semibold">
                                    ₹{totalPrice}
                                </div>
                            </div>

                            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <Button type="submit" form="checkout-form" className="w-full mt-6 h-12 rounded-full text-base" disabled={loading}>
                                {loading ? "Processing..." : "Pay Now"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 ${className}`}>{children}</div>
}
