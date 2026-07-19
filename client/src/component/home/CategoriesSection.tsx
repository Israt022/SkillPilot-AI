"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Brain,
  Palette,
  TrendingUp,
  Database,
  Shield,
  Smartphone,
  Cloud,
} from "lucide-react";

const categories = [
  {
    icon: Code2,
    name: "Web Development",
    count: 142,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    tags: ["Beginner", "Intermediate", "Advanced"],
    popular: true,
  },
  {
    icon: Brain,
    name: "AI & Machine Learning",
    count: 98,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    tags: ["Intermediate", "Advanced"],
    popular: true,
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    count: 76,
    color: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
    tags: ["Beginner", "Intermediate"],
    popular: false,
  },
  {
    icon: TrendingUp,
    name: "Digital Marketing",
    count: 65,
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    tags: ["Beginner", "Intermediate"],
    popular: false,
  },
  {
    icon: Database,
    name: "Data Science",
    count: 112,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    tags: ["Intermediate", "Advanced"],
    popular: true,
  },
  {
    icon: Shield,
    name: "Cybersecurity",
    count: 54,
    color: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
    tags: ["Intermediate", "Advanced"],
    popular: false,
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    count: 83,
    color: "#facc15",
    bg: "rgba(250,204,21,0.10)",
    tags: ["Beginner", "Intermediate"],
    popular: false,
  },
  {
    icon: Cloud,
    name: "Cloud & DevOps",
    count: 71,
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.12)",
    tags: ["Intermediate", "Advanced"],
    popular: true,
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: "#34d399",
  Intermediate: "#facc15",
  Advanced: "#f87171",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function CategoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="categories"
      ref={ref}
      className="section-padding relative"
    >
      <div className="container-custom">
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
              background: "rgba(167,139,250,0.15)",
              color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.3)",
            }}
          >
            Explore Categories
          </span>
          <h2
            className="font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            Learn Skills Across{" "}
            <span className="text-gradient">50+ Categories</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base"
            style={{ color: "var(--color-muted)" }}
          >
            From beginner-friendly foundations to advanced expert-level content—
            organized so you can find exactly what you need.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isHovered = hovered === cat.name;
            return (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                onHoverStart={() => setHovered(cat.name)}
                onHoverEnd={() => setHovered(null)}
                className="glass category-card rounded-2xl p-6 cursor-pointer"
                style={{
                  border: `1px solid ${isHovered ? cat.color + "55" : "var(--color-border)"}`,
                  boxShadow: isHovered ? `0 0 24px ${cat.color}25` : "none",
                  transition: "all 0.3s ease",
                }}
                id={`category-${cat.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {/* Top row */}
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: cat.bg }}
                  >
                    <Icon size={24} style={{ color: cat.color }} />
                  </div>
                  {cat.popular && (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{
                        background: "rgba(99,102,241,0.2)",
                        color: "#a78bfa",
                        border: "1px solid rgba(99,102,241,0.3)",
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>

                <h3
                  className="font-heading mb-1 text-base font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {cat.name}
                </h3>
                <p
                  className="mb-4 text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  {cat.count} resources
                </p>

                {/* Difficulty tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        background: difficultyColors[tag] + "18",
                        color: difficultyColors[tag],
                        border: `1px solid ${difficultyColors[tag]}35`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Animated bar */}
                <motion.div
                  className="mt-4 h-0.5 rounded-full"
                  style={{ background: cat.color }}
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : "30%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Browse all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center"
        >
          <a
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all hover:bg-primary/10"
            style={{
              borderColor: "rgba(99,102,241,0.35)",
              color: "#a78bfa",
            }}
          >
            Browse All Categories →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
