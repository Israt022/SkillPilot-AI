"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: "1",
    category: "AI & Learning",
    tag: "Guide",
    tagColor: "#6366f1",
    title: "How AI Is Reshaping the Future of Skill Development in 2026",
    excerpt:
      "Discover how machine learning models are personalizing education at scale, predicting skill gaps before they appear, and making continuous learning frictionless.",
    readTime: "6 min read",
    date: "Jul 15, 2026",
    gradient: "linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)",
    emoji: "🤖",
  },
  {
    id: "2",
    category: "Career Growth",
    tag: "Tips",
    tagColor: "#06b6d4",
    title: "Top 10 In-Demand Tech Skills Employers Are Paying Premium for in 2026",
    excerpt:
      "Data from 50,000+ job postings reveals which skills command the biggest salary premiums and where the fastest-growing opportunities are hiding.",
    readTime: "8 min read",
    date: "Jul 10, 2026",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
    emoji: "📈",
  },
  {
    id: "3",
    category: "Learning Science",
    tag: "Research",
    tagColor: "#34d399",
    title: "The Science of Spaced Repetition: Why You Forget 90% of What You Learn",
    excerpt:
      "Cognitive research shows that most self-study is deeply inefficient. We break down the Ebbinghaus Forgetting Curve and how SkillPilot's adaptive system fights it.",
    readTime: "5 min read",
    date: "Jul 5, 2026",
    gradient: "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)",
    emoji: "🧠",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function BlogSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="blog"
      ref={ref}
      className="section-padding relative"
    >
      {/* Decorative */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <span
              className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(34,211,153,0.12)",
                color: "#34d399",
                border: "1px solid rgba(34,211,153,0.25)",
              }}
            >
              Resources & Insights
            </span>
            <h2
              className="font-heading text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--color-text)" }}
            >
              From Our{" "}
              <span className="text-gradient">Learning Blog</span>
            </h2>
          </div>
          <Link href="/explore">
            <motion.button
              whileHover={{ x: 4 }}
              className="hidden items-center gap-2 text-sm font-medium sm:flex"
              style={{ color: "#6366f1" }}
            >
              View All Posts <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="blog-card glass rounded-2xl overflow-hidden group"
              id={`blog-post-${post.id}`}
            >
              {/* Gradient Banner */}
              <div
                className="relative flex h-44 items-center justify-center overflow-hidden"
                style={{ background: post.gradient }}
              >
                <motion.span
                  className="text-6xl"
                  animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {post.emoji}
                </motion.span>
                {/* Shimmer */}
                <div className="animate-shimmer absolute inset-0" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      background: post.tagColor + "18",
                      color: post.tagColor,
                      border: `1px solid ${post.tagColor}30`,
                    }}
                  >
                    <Tag size={10} />
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-muted)" }}>
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>

                <h3
                  className="font-heading mb-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary"
                  style={{ color: "var(--color-text)" }}
                >
                  {post.title}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed line-clamp-3"
                  style={{ color: "var(--color-muted)" }}
                >
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                    {post.date}
                  </span>
                  <motion.span
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: post.tagColor }}
                    whileHover={{ x: 3 }}
                  >
                    Read more <ArrowRight size={12} />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "#6366f1" }}
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
