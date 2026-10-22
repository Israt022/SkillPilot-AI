"use client";

import { motion } from "framer-motion";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface NetworkErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export default function NetworkError({
  onRetry,
  isRetrying = false,
}: NetworkErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090d18] px-4 text-slate-100">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center"
      >
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-400/20 bg-amber-400/10">
          <WifiOff size={36} className="text-amber-400" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
          Connection problem
        </p>

        <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
          You&apos;re offline
        </h1>

        <p className="mb-8 text-sm leading-7 text-slate-400 sm:text-base">
          We couldn&apos;t connect to the internet. Check your connection
          and try again.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 font-semibold transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={isRetrying ? "animate-spin" : ""}
            />
            {isRetrying ? "Checking..." : "Try Again"}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/5"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </motion.section>
    </main>
  );
}