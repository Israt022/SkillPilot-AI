"use client";

import { motion } from "framer-motion";

export default function AIWorkspacePage() {
  const features = [
    {
      icon: "🤖",
      title: "AI Career Assistant",
      description:
        "Ask questions, get learning suggestions, and receive AI-powered career advice.",
    },
    {
      icon: "🧠",
      title: "Skill Analysis",
      description:
        "Evaluate your current skills and discover what you need to learn next.",
    },
    {
      icon: "🚀",
      title: "Learning Roadmap",
      description:
        "Follow a personalized roadmap designed around your goals and career path.",
    },
  ];

  return (
    <main className="flex-1 px-4 py-20">
      <section className="mx-auto max-w-5xl text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            AI Workspace
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Your Personal{" "}
            <span className="text-gradient">
              AI Learning Copilot
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-default-500">
            Get personalized guidance, analyze your skills, practice
            interviews, and build your career roadmap with AI-powered
            assistance.
          </p>
        </motion.div>


        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-2xl border border-default-200 bg-background p-6 shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="mb-4 text-4xl"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-default-500">
                {feature.description}
              </p>

            </motion.div>
          ))}

        </div>


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-8"
        >

          <h2 className="text-2xl font-bold">
            Ready to improve your skills?
          </h2>

          <p className="mt-2 text-default-500">
            Start your AI-guided learning journey and achieve your
            career goals faster.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:bg-primary/90"
          >
            Start Learning
          </motion.button>

        </motion.div>

      </section>
    </main>
  );
}