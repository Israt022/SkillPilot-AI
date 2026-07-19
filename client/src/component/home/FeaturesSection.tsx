"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Map,
  BarChart2,
  Telescope,
  Clock,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning Paths",
    description:
      "Our AI engine builds personalized roadmaps based on your goals, existing skills, and learning pace—so you always know what to study next.",
    color: "#6366f1",
    delay: 0,
  },
  {
    icon: Map,
    title: "Curated Resource Library",
    description:
      "Every resource is hand-picked and organized by category, difficulty, and estimated time—cutting through the noise so you can focus.",
    color: "#06b6d4",
    delay: 0.1,
  },
  {
    icon: BarChart2,
    title: "Progress Analytics",
    description:
      "Track your learning streaks, completed modules, and skill milestones on a beautiful dashboard designed to keep you motivated.",
    color: "#a78bfa",
    delay: 0.2,
  },
  {
    icon: Telescope,
    title: "Skill Discovery Engine",
    description:
      "Explore in-demand skills with market demand scores, salary insights, and job opportunity data—all updated in real time.",
    color: "#f472b6",
    delay: 0.3,
  },
  {
    icon: Clock,
    title: "Bite-Sized Learning",
    description:
      "Resources are tagged with precise time estimates. Fit learning into your schedule with sessions from 5 minutes to 3 hours.",
    color: "#34d399",
    delay: 0.4,
  },
  {
    icon: ShieldCheck,
    title: "AI Workspace Copilot",
    description:
      "Your private AI assistant helps you summarize content, answer questions, and generate practice exercises as you learn.",
    color: "#fb923c",
    delay: 0.5,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "rgba(99,102,241,0.03)" }}
    >
      {/* Subtle radial */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.07), transparent)",
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(6,182,212,0.12)",
              color: "#06b6d4",
              border: "1px solid rgba(6,182,212,0.25)",
            }}
          >
            What We Offer
          </span>
          <h2
            className="font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            Everything You Need to{" "}
            <span className="text-gradient">Level Up</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base"
            style={{ color: "var(--color-muted)" }}
          >
            SkillPilot AI combines the best of AI personalization with
            hand-curated resources to make skill development efficient and
            enjoyable.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass glass-hover rounded-2xl p-7 group"
                style={{ transition: "all 0.3s ease" }}
              >
                {/* Icon with animated ring */}
                <div className="mb-5 relative inline-block">
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: feat.color + "30" }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: feat.color + "20",
                      border: `1px solid ${feat.color}45`,
                    }}
                  >
                    <Icon size={26} style={{ color: feat.color }} />
                  </div>
                </div>

                <h3
                  className="font-heading mb-2.5 text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feat.description}
                </p>

                {/* Hover indicator */}
                <div
                  className="mt-5 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-16"
                  style={{ background: feat.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
