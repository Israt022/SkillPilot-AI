"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserCheck, Search, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Tell Us Your Goals",
    description:
      "Create your profile and share your current skills, career goals, and preferred learning style. It only takes 2 minutes.",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    step: "02",
    icon: Search,
    title: "AI Builds Your Roadmap",
    description:
      "Our AI analyzes thousands of resources and market trends to craft a personalized, step-by-step learning path just for you.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Learn & Track Progress",
    description:
      "Follow your roadmap, complete curated resources, and watch your skill level grow. Your AI copilot is there every step of the way.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.3)",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "rgba(6,182,212,0.02)" }}
    >
      {/* Background radial */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,102,241,0.06), transparent)",
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(6,182,212,0.12)",
              color: "#06b6d4",
              border: "1px solid rgba(6,182,212,0.25)",
            }}
          >
            How It Works
          </span>
          <h2
            className="font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            Get Started in{" "}
            <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base"
            style={{ color: "var(--color-muted)" }}
          >
            From sign-up to expert—our streamlined process gets you learning the
            right things from day one.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line (desktop) */}
          <motion.div
            className="pointer-events-none absolute top-10 hidden md:block"
            style={{
              left: "calc(16.67% + 24px)",
              right: "calc(16.67% + 24px)",
              height: 2,
              background:
                "linear-gradient(90deg, #6366f1, #06b6d4, #a78bfa)",
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
                className="flex flex-col items-center text-center"
                id={`step-${step.step}`}
              >
                {/* Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: step.color + "20",
                    border: `2px solid ${step.color}55`,
                    boxShadow: `0 0 24px ${step.glow}`,
                  }}
                >
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${step.color}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <Icon size={32} style={{ color: step.color }} />

                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: step.color,
                      color: "white",
                    }}
                  >
                    {i + 1}
                  </div>
                </motion.div>

                <span
                  className="font-heading mb-2 text-xs font-bold uppercase tracking-widest"
                  style={{ color: step.color }}
                >
                  Step {step.step}
                </span>
                <h3
                  className="font-heading mb-3 text-xl font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="max-w-xs text-sm leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
