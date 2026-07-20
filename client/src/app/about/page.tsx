"use client";

import { motion } from "framer-motion";
import { Brain, Target, Sparkles, Rocket } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Receive personalized learning recommendations powered by intelligent AI.",
  },
  {
    icon: Target,
    title: "Career Focused",
    description:
      "Develop practical skills and prepare for interviews with guided roadmaps.",
  },
  {
    icon: Rocket,
    title: "Learn Faster",
    description:
      "Track progress, discover resources, and achieve your learning goals efficiently.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">

      {/* Hero */}
      <section className="relative px-4 py-24">

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, rgba(99,102,241,.15), transparent 60%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom relative text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles size={14} />
            About SkillPilot AI
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Learn Smarter with
            <span className="text-gradient"> AI Guidance</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-default-500">
            SkillPilot AI is an AI-powered learning and career assistant that
            helps learners discover high-quality learning resources, receive
            personalized recommendations, practice interviews, and build
            career-ready skills through intelligent AI assistance.
          </p>
        </motion.div>
      </section>

      {/* Features */}

      <section className="container-custom px-4 pb-20">

        <div className="grid gap-6 md:grid-cols-3">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .2 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-default-200 bg-background p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-default-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats */}

      <section className="bg-primary/5 py-20">

        <div className="container-custom grid gap-8 text-center md:grid-cols-4">

          <div>
            <h2 className="text-4xl font-bold text-primary">100+</h2>
            <p className="text-default-500">Learning Resources</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-primary">10+</h2>
            <p className="text-default-500">Skill Categories</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-primary">AI</h2>
            <p className="text-default-500">Personalized Guidance</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-primary">24/7</h2>
            <p className="text-default-500">Learning Support</p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="container-custom px-4 py-24 text-center">

        <h2 className="text-4xl font-bold">
          Ready to Level Up Your Skills?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-default-500">
          Join SkillPilot AI and unlock a smarter way to learn, practice,
          and achieve your career goals.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-flex rounded-xl bg-primary px-8 py-3 font-semibold text-white transition hover:scale-105"
        >
          Get Started
        </Link>

      </section>

    </main>
  );
}