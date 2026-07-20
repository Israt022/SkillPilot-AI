"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">

            {/* Background Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at top, rgba(99,102,241,0.15), transparent 60%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-xl rounded-3xl border border-default-200 bg-background/80 p-10 text-center shadow-2xl backdrop-blur-xl"
            >
                {/* 404 */}
                <motion.h1
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                    className="text-7xl font-black tracking-tight text-primary md:text-9xl"
                >
                    404
                </motion.h1>

                <h2 className="mt-5 text-3xl font-bold">
                    Oops! Page Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-md text-default-500">
                    The page you're looking for doesn't exist or may have been moved.
                    Let's get you back to exploring SkillPilot AI.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-105"
                    >
                        <Home size={18} />
                        Back Home
                    </Link>

                    <Link
                        href="/explore"
                        className="flex items-center justify-center gap-2 rounded-xl border border-default-300 px-6 py-3 font-semibold transition hover:bg-default-100"
                    >
                        <Search size={18} />
                        Explore Resources
                    </Link>

                </div>

                <p className="mt-8 text-sm text-default-400">
                    Error Code: <span className="font-semibold">404 - Not Found</span>
                </p>
            </motion.div>
        </main>
    );
}