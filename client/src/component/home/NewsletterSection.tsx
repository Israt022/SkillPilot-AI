"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate async
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  const benefits = [
    "Weekly curated skill picks",
    "AI learning tips & research",
    "Exclusive early access features",
    "No spam, unsubscribe anytime",
  ];

  return (
    <section
      id="newsletter"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      {/* Large gradient blob */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.12), rgba(6,182,212,0.06), transparent)",
        }}
      />

      {/* Animated rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: 200 + i * 160,
            height: 200 + i * 160,
            borderColor: `rgba(99,102,241,${0.08 - i * 0.02})`,
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}

      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 sm:p-12 text-center"
            style={{
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 0 60px rgba(99,102,241,0.08)",
            }}
          >
            {/* Icon */}
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                boxShadow: "0 0 24px rgba(99,102,241,0.4)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={30} className="text-white" />
            </motion.div>

            <span
              className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(99,102,241,0.15)",
                color: "#a78bfa",
                border: "1px solid rgba(99,102,241,0.3)",
              }}
            >
              Newsletter
            </span>

            <h2
              className="font-heading mb-3 text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--color-text)" }}
            >
              Stay Ahead of the{" "}
              <span className="text-gradient">Skill Curve</span>
            </h2>
            <p
              className="mx-auto mb-8 max-w-lg text-base leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Join 5,000+ learners getting weekly AI-curated skill picks, career
              insights, and platform updates delivered to their inbox.
            </p>

            {/* Benefits */}
            <div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--color-muted)" }}>
                  <CheckCircle size={14} style={{ color: "#34d399" }} />
                  {b}
                </div>
              ))}
            </div>

            {/* Form */}
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: "rgba(52,211,153,0.2)", border: "2px solid #34d399" }}
                >
                  <CheckCircle size={32} style={{ color: "#34d399" }} />
                </div>
                <p className="font-heading text-xl font-semibold" style={{ color: "var(--color-text)" }}>
                  You're subscribed! 🎉
                </p>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Check your inbox for a welcome email from SkillPilot AI.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto"
                id="newsletter-form"
              >
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-muted)" }}
                  />
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                     className="w-full rounded-xl border bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500"
                    style={{
                      borderColor: "rgba(99,102,241,0.3)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-70"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  }}
                  id="newsletter-submit"
                >
                  {status === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Subscribe <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
