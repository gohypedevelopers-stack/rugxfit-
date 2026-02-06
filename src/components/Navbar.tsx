"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                    RugX<span className="text-gray-500">FIT</span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <Link href="#store" className="hover:text-black dark:hover:text-white transition-colors">Store</Link>
                    <Link href="#shaker" className="hover:text-black dark:hover:text-white transition-colors">Shaker</Link>
                    <Link href="#wraps" className="hover:text-black dark:hover:text-white transition-colors">Accessories</Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Support</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
