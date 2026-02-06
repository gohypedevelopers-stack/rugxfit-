"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { ArrowRight, Package } from "lucide-react";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Navbar />
            <div className="max-w-5xl mx-auto pt-24 px-6 pb-12">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-zinc-500">No orders found.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Link href={`/account/orders/${order.id}`} key={order.id} className="block group">
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-sm text-zinc-500">Order #{order.id}</p>
                                            <p className="font-semibold mt-1">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800 pt-4">
                                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                            <Package className="w-4 h-4" />
                                            <span>{order.items.length} item(s)</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-medium text-blue-600 group-hover:underline">
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
