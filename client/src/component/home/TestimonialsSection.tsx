"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer @ Stripe",
    avatar: "SC",
    avatarColor: "#6366f1",
    rating: 5,
    text: "SkillPilot AI completely transformed how I learn. The personalized roadmap got me from zero to landing my dream job in 8 months. The AI copilot is like having a mentor available 24/7.",
  },
  {
    name: "Marcus Johnson",
    role: "Data Scientist @ Meta",
    avatar: "MJ",
    avatarColor: "#06b6d4",
    rating: 5,
    text: "I've tried dozens of learning platforms, but nothing compares to SkillPilot's AI-curated paths. The difficulty tagging and time estimates are spot-on. Saved me hundreds of hours.",
  },
  {
    name: "Priya Sharma",
    role: "UX Designer @ Airbnb",
    avatar: "PS",
    avatarColor: "#f472b6",
    rating: 5,
    text: "The skill discovery engine helped me identify gaps I didn't even know I had. Six months later, I got promoted. The market insight data alone is worth it.",
  },
  {
    name: "Alex Rivera",
    role: "ML Engineer @ OpenAI",
    avatar: "AR",
    avatarColor: "#a78bfa",
    rating: 5,
    text: "As someone who loves learning but hates wasting time on irrelevant content, SkillPilot AI is a dream. Every recommendation feels incredibly precise and valuable.",
  },
  {
    name: "Jordan Kim",
    role: "Cloud Architect @ AWS",
    avatar: "JK",
    avatarColor: "#34d399",
    rating: 5,
    text: "The AI workspace copilot is incredibly impressive. It summarizes resources, generates quizzes, and answers follow-up questions in context. Truly next-generation learning.",
  },
  {
    name: "Emma Wilson",
    role: "Product Manager @ Notion",
    avatar: "EW",
    avatarColor: "#fb923c",
    rating: 5,
    text: "SkillPilot made me realize I was studying the wrong skills for my goals. After switching to its recommended path, I closed skill gaps that had held me back for years.",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="glass rounded-2xl p-6 flex-shrink-0"
      style={{ width: 320 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: t.avatarColor }}
          >
            {t.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
              {t.name}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {t.role}
            </p>
          </div>
        </div>
        <Quote size={20} style={{ color: "rgba(99,102,241,0.4)" }} />
      </div>

      {/* Stars */}
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} fill="#facc15" stroke="none" />
        ))}
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        "{t.text}"
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for infinite scroll
  const allCards = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-padding overflow-hidden relative"
      style={{ background: "rgba(99,102,241,0.02)" }}
    >
      {/* Side fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20"
        style={{
          background: "linear-gradient(to right, var(--color-bg), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20"
        style={{
          background: "linear-gradient(to left, var(--color-bg), transparent)",
        }}
      />

      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(250,204,21,0.12)",
              color: "#facc15",
              border: "1px solid rgba(250,204,21,0.25)",
            }}
          >
            Testimonials
          </span>
          <h2
            className="font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            Loved by{" "}
            <span className="text-gradient">Learners Worldwide</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base"
            style={{ color: "var(--color-muted)" }}
          >
            Don't take our word for it — hear from the 12,000+ learners who've
            accelerated their careers with SkillPilot AI.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-5">
        {/* Row 1 — left */}
        <div
          className="flex gap-5"
          style={{
            animation: isPaused ? "none" : "marquee 35s linear infinite",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {allCards.slice(0, 8).map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* Row 2 — right (reverse) */}
        <div
          className="flex gap-5"
          style={{
            animation: isPaused
              ? "none"
              : "marquee 40s linear infinite reverse",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {allCards.slice(3).map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
