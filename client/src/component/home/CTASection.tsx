"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const highlights = [
  { label: "Free to Start", icon: "✨" },
  { label: "No Credit Card", icon: "💳" },
  { label: "Cancel Anytime", icon: "🔓" },
];

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      {/* Deep gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(6,182,212,0.08) 100%)",
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="container-custom relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{
              borderColor: "rgba(99,102,241,0.4)",
              background: "rgba(99,102,241,0.1)",
              color: "#a78bfa",
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={14} />
            Start Your Learning Journey Today
          </motion.div>

          <h2
            className="font-heading mb-5 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: 800,
              color: "var(--color-text)",
            }}
          >
            Your Next Career Breakthrough{" "}
            <br className="hidden sm:block" />
            Starts with{" "}
            <span className="text-gradient">One Decision</span>
          </h2>

          <p
            className="mx-auto mb-10 max-w-xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            Join 12,000+ learners using SkillPilot AI to build in-demand skills,
            get personalized guidance, and land the career they've always wanted.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/register">
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 40px rgba(99,102,241,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                }}
                id="cta-register-btn"
              >
                <Rocket size={18} />
                Start for Free
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </motion.button>
            </Link>

            <Link href="/explore">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
                id="cta-explore-btn"
              >
                Explore Skills
              </motion.button>
            </Link>
          </div>

          {/* Trust highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                <span>{h.icon}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
