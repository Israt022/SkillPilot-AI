import {
  BookOpen,
  Brain,
  Bookmark,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@heroui/react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/70 p-8 text-white">

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
              🚀 AI Learning Dashboard
            </span>

            <h1 className="mt-5 text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-xl text-white/80">
              Manage your learning resources, explore AI recommendations,
              and continue your personalized learning journey.
            </p>

            <Button className="mt-6 bg-white text-black">
              Explore Resources
            </Button>

          </div>

          <div className="hidden lg:block">

            <Brain size={130} className="opacity-20" />

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border bg-background p-6 shadow-sm">

          <BookOpen className="mb-4 text-primary" size={34} />

          <h2 className="text-4xl font-bold">
            28
          </h2>

          <p className="mt-2 text-default-500">
            Learning Resources
          </p>

        </div>

        <div className="rounded-3xl border bg-background p-6 shadow-sm">

          <Bookmark className="mb-4 text-primary" size={34} />

          <h2 className="text-4xl font-bold">
            7
          </h2>

          <p className="mt-2 text-default-500">
            Saved Resources
          </p>

        </div>

        <div className="rounded-3xl border bg-background p-6 shadow-sm">

          <Sparkles className="mb-4 text-primary" size={34} />

          <h2 className="text-4xl font-bold">
            18
          </h2>

          <p className="mt-2 text-default-500">
            AI Generations
          </p>

        </div>

        <div className="rounded-3xl border bg-background p-6 shadow-sm">

          <Brain className="mb-4 text-primary" size={34} />

          <h2 className="text-4xl font-bold">
            92%
          </h2>

          <p className="mt-2 text-default-500">
            Profile Completion
          </p>

        </div>

      </section>

      {/* Bottom */}

      <section className="grid gap-6 lg:grid-cols-2">

        {/* AI Assistant */}

        <div className="rounded-3xl border bg-background p-6">

          <div className="flex items-center gap-3">

            <Brain className="text-primary" />

            <h2 className="text-xl font-semibold">
              AI Assistant
            </h2>

          </div>

          <p className="mt-4 text-default-500">
            Need help finding learning resources or generating study
            materials? Let AI assist you.
          </p>

          <Button
            className="mt-6"

          >
            Open AI Assistant

            <ArrowRight size={18} />

          </Button>

        </div>

        {/* Recent Activity */}

        <div className="rounded-3xl border bg-background p-6">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="font-medium">
                  Added React Resource
                </p>

                <span className="text-sm text-default-500">
                  2 hours ago
                </span>

              </div>

            </div>

            <div className="flex items-center justify-between">

              <div>

                <p className="font-medium">
                  AI Generated Learning Notes
                </p>

                <span className="text-sm text-default-500">
                  Yesterday
                </span>

              </div>

            </div>

            <div className="flex items-center justify-between">

              <div>

                <p className="font-medium">
                  Saved Next.js Guide
                </p>

                <span className="text-sm text-default-500">
                  3 days ago
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}