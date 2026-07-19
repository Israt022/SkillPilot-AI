"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Layers, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 12400,
    suffix: "+",
    label: "Active Learners",
    color: "#6366f1",
    description: "Learners growing daily",
  },
  {
    icon: BookOpen,
    value: 850,
    suffix: "+",
    label: "Curated Resources",
    color: "#06b6d4",
    description: "Hand-picked quality content",
  },
  {
    icon: Layers,
    value: 50,
    suffix: "+",
    label: "Skill Categories",
    color: "#a78bfa",
    description: "From tech to design",
  },
  {
    icon: TrendingUp,
    value: 97,
    suffix: "%",
    label: "Success Rate",
    color: "#34d399",
    description: "Learners achieve their goals",
  },
];

function Counter({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const steps = 60;
    const step = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [start, value]);

  return (
    <span className="stat-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative line */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
        }}
      />

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
              background: "rgba(99,102,241,0.15)",
              color: "#a78bfa",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            By The Numbers
          </span>
          <h2
            className="font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            Trusted by Thousands of{" "}
            <span className="text-gradient">Ambitious Learners</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="glass glass-hover category-card rounded-2xl p-7 text-center"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: stat.color + "20",
                    border: `1px solid ${stat.color}40`,
                  }}
                >
                  <Icon size={26} style={{ color: stat.color }} />
                </div>

                {/* Number */}
                <div style={{ color: stat.color }}>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    start={inView}
                  />
                </div>

                <p
                  className="mt-1.5 font-heading text-base font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {stat.label}
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
