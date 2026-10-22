"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
} from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090d18] px-4 py-16 text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg text-center"
      >
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-400/20 bg-red-400/10">
          <AlertTriangle
            size={36}
            className="text-red-400"
            strokeWidth={1.5}
          />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
          Something went wrong
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Oops! An unexpected error occurred.
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
          We couldn&apos;t load this page properly. Please try again.
          If your internet connection is unavailable, check it and retry.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/[0.08]"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-5 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-300"
        >
          <ArrowLeft size={15} />
          Go back
        </button>
      </motion.section>
    </main>
  );
}