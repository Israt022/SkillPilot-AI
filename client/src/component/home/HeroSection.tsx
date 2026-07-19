"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Brain,
  Zap,
  Target,
} from "lucide-react";

const slides = [
  {
    id: 0,
    badge: "🚀 AI-Powered Learning",
    headline: "Learn Faster with",
    highlight: "AI Guidance",
    sub: "SkillPilot AI curates the best resources, tracks your progress, and gives you personalized roadmaps to master any skill in record time.",
    cta: "Start Learning Free",
    ctaHref: "/register",
    secondary: "Explore Skills",
    secondaryHref: "/explore",
    accentColor: "#6366f1",
    glowColor: "rgba(99,102,241,0.35)",
    icon: Brain,
    tag: "10,000+ Learners Trust Us",
  },
  {
    id: 1,
    badge: "⚡ Smart Recommendations",
    headline: "Skills That Match",
    highlight: "Your Career Goals",
    sub: "Our AI analyzes your background, interests, and market trends to recommend skills that actually move the needle for your professional growth.",
    cta: "Get My Roadmap",
    ctaHref: "/register",
    secondary: "See How It Works",
    secondaryHref: "#how-it-works",
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.35)",
    icon: Target,
    tag: "Personalized for You",
  },
  {
    id: 2,
    badge: "🎯 Industry-Ready Skills",
    headline: "Go From Learner",
    highlight: "to Expert Fast",
    sub: "Structured learning paths, curated resources by difficulty, and real-world projects. Everything you need to become job-ready in today's top skills.",
    cta: "Explore Courses",
    ctaHref: "/explore",
    secondary: "View Categories",
    secondaryHref: "#categories",
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.35)",
    icon: Zap,
    tag: "50+ Skill Categories",
  },
];

// Floating particle blobs
const blobs = [
  { size: 320, top: "10%", left: "-8%" as string | undefined, right: undefined as string | undefined, color: "rgba(99,102,241,0.12)", delay: 0 },
  { size: 250, top: "55%", left: undefined as string | undefined, right: "-5%" as string | undefined, color: "rgba(6,182,212,0.10)", delay: 1.5 },
  { size: 180, top: "30%", left: "60%" as string | undefined, right: undefined as string | undefined, color: "rgba(167,139,250,0.09)", delay: 3 },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

// Text delays indexed 0-4
const textDelays = [0, 0.12, 0.24, 0.36, 0.48];

export default function HeroSection() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      const dir = idx > current ? 1 : -1;
      setCurrent([idx, dir]);
    },
    [current]
  );

  const goNext = useCallback(() => {
    const next = (current + 1) % slides.length;
    setCurrent([next, 1]);
  }, [current]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5500);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="relative w-full overflow-hidden bg-grid"
      style={{ minHeight: "65vh", background: "var(--color-bg)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Section"
    >
      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-100" />

      {/* Animated blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}

      {/* Slide Container */}
      <div className="relative" style={{ height: "65vh", minHeight: 520 }}>
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center"
          >
            <div className="container-custom w-full px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: textDelays[0], duration: 0.55 } }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
                  style={{
                    borderColor: slide.accentColor + "55",
                    background: slide.accentColor + "18",
                    color: slide.accentColor,
                  }}
                >
                  <span>{slide.badge}</span>
                  <span
                    className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ background: slide.accentColor + "30" }}
                  >
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: textDelays[1], duration: 0.55 } }}
                  className="font-heading mb-4 leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 800 }}
                >
                  <span className="text-white">{slide.headline} </span>
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${slide.accentColor}, #a78bfa)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {slide.highlight}
                  </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: textDelays[2], duration: 0.55 } }}
                  className="mb-8 max-w-2xl text-base sm:text-lg leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {slide.sub}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: textDelays[3], duration: 0.55 } }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Link href={slide.ctaHref}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${slide.glowColor}` }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${slide.accentColor}, #8b5cf6)`,
                        boxShadow: `0 0 16px ${slide.glowColor}`,
                      }}
                      id={`hero-cta-${current}`}
                    >
                      {slide.cta}
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </motion.button>
                  </Link>

                  <Link href={slide.secondaryHref}>
                    <motion.button
                      whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.09)" }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-base font-medium text-white transition-all"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                      id={`hero-secondary-${current}`}
                    >
                      {slide.secondary}
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Floating icon */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: textDelays[4], duration: 0.55 } }}
                  className="mt-10 flex items-center gap-3 text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: slide.accentColor + "25" }}
                  >
                    <Icon size={18} style={{ color: slide.accentColor }} />
                  </div>
                  <span>Powered by Agentic AI — always learning, always improving</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`slider-dot ${i === current ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Arrow */}
      <motion.a
        href="#stats"
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1 text-xs"
        style={{ color: "var(--color-muted)" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to next section"
      >
        <span className="text-xs tracking-widest uppercase opacity-60">Scroll</span>
        <ChevronDown size={20} />
      </motion.a>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-bg))",
        }}
      />
    </section>
  );
}
