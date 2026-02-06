"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Circle } from "lucide-react";

export default function OrderDetailPage() {
    const params = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrder(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) fetchOrder();
    }, [params.id]);

    if (loading) return <div className="min-h-screen pt-24 px-6 text-center">Loading...</div>;
    if (!order) return <div className="min-h-screen pt-24 px-6 text-center">Order not found.</div>;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Navbar />
            <div className="max-w-4xl mx-auto pt-24 px-6 pb-12">
                <h1 className="text-3xl font-bold mb-8">Order #{order.id}</h1>

                {/* Timeline */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
                    <h3 className="text-lg font-semibold mb-6">Tracking Status</h3>
                    <Timeline currentStatus={order.shipment?.status || 'processing'} />
                </div>

                {/* Order Details */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold mb-6">Items</h3>
                    <div className="space-y-6">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-20 h-20 bg-zinc-50 rounded-lg shrink-0">
                                    {/* Placeholder logic since backend image might vary, we use frontend defaults for map */}
                                    {/* In real app, backend stores full image path. */}
                                    <div className="w-full h-full bg-zinc-200" />
                                </div>
                                <div>
                                    <p className="font-medium">{item.variant.product.name}</p>
                                    <p className="text-sm text-zinc-500">Variant: {item.variant.name}</p>
                                    <p className="text-sm text-zinc-500">Qty: {item.quantity} x ₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-zinc-100 dark:border-zinc-800 mt-6 pt-6 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const STEPS = [
    { id: 'paid', label: 'Paid' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' }
];

function Timeline({ currentStatus }: { currentStatus: string }) {
    // Basic mapping, assuming simple linear progression for MVP
    const statusOrder = ['paid', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase()) === -1 ? 1 : statusOrder.indexOf(currentStatus.toLowerCase());

    return (
        <div className="flex items-center justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10" />
            <div
                className="absolute top-1/2 left-0 h-0.5 bg-green-500 -z-10 transition-all duration-500"
                style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
            />

            {STEPS.map((step, idx) => {
                const isCompleted = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                    <div key={step.id} className="flex flex-col items-center bg-white dark:bg-zinc-900 px-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted ? "border-green-500 bg-green-500 text-white" : "border-zinc-300 bg-white"
                            }`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5 text-zinc-300" />}
                        </div>
                        <span className={`text-xs font-medium mt-2 ${isCurrent ? "text-green-600" : "text-zinc-500"}`}>
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
