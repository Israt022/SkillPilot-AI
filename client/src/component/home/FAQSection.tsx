"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is SkillPilot AI free to use?",
    a: "Yes! You can start completely free with access to curated resources, basic skill categories, and your personal dashboard. Premium plans unlock the full AI workspace copilot, advanced analytics, and priority recommendations.",
  },
  {
    q: "How does the AI personalize my learning path?",
    a: "When you sign up, you answer a short questionnaire about your current skills, goals, and learning style. Our AI then analyzes thousands of resources and market trends to build a roadmap tailored specifically to you—and it keeps improving as you learn.",
  },
  {
    q: "What kind of resources are available?",
    a: "SkillPilot curates video courses, articles, interactive tutorials, projects, books, and podcasts from across the web. Every resource is tagged with difficulty level (Beginner / Intermediate / Advanced) and an accurate time estimate.",
  },
  {
    q: "How is SkillPilot different from platforms like Udemy or Coursera?",
    a: "We don't create content—we aggregate and intelligently curate the best content from everywhere. Think of us as your AI-powered learning navigator that finds the right resources from across the web and builds a coherent path for you.",
  },
  {
    q: "Can I track my learning progress?",
    a: "Absolutely. Your dashboard shows completed resources, learning streaks, skill level milestones, time invested, and career readiness scores. You can also export your progress as a portfolio-ready report.",
  },
  {
    q: "What is the AI Workspace Copilot?",
    a: "It's your private AI study assistant. While learning, you can ask it to summarize content, answer follow-up questions in context, generate practice quizzes, suggest related topics, and help you apply concepts to real projects.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "rgba(99,102,241,0.02)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(99,102,241,0.06), transparent)",
        }}
      />

      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          {/* Left sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <span
              className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(99,102,241,0.15)",
                color: "#a78bfa",
                border: "1px solid rgba(99,102,241,0.3)",
              }}
            >
              FAQ
            </span>
            <h2
              className="font-heading text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--color-text)" }}
            >
              Got{" "}
              <span className="text-gradient">Questions?</span>
              <br />
              We've Got Answers.
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Everything you need to know about SkillPilot AI. Can't find your
              answer?{" "}
              <a
                href="/contact"
                style={{ color: "#6366f1" }}
                className="hover:underline"
              >
                Contact us →
              </a>
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="glass rounded-2xl overflow-hidden"
                  style={{
                    border: isOpen
                      ? "1px solid rgba(99,102,241,0.35)"
                      : "1px solid var(--color-border)",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-heading text-base font-semibold"
                      style={{ color: isOpen ? "#a78bfa" : "var(--color-text)" }}
                    >
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                      style={{ color: isOpen ? "#6366f1" : "var(--color-muted)" }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="px-6 pb-5 text-sm leading-relaxed"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
