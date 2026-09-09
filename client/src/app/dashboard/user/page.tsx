"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Bookmark,
  Sparkles,
  ArrowRight,
  Plus,
  Compass,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const [userResources, setUserResources] = useState<any[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPlatformResources, setTotalPlatformResources] = useState(0);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_SERVER_URL;
  const userId = session?.user?.id || (session?.user as any)?._id;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const promises: Promise<any>[] = [
          fetch(`${API}/api/categories`).then((r) => r.json()),
          fetch(`${API}/api/resources`).then((r) => r.json()),
        ];

        if (userId) {
          promises.push(
            fetch(`${API}/api/resources/${userId}`).then((r) => r.json())
          );
        }

        const [catData, allResData, userResData] = await Promise.all(promises);

        if (catData?.success) {
          setTotalCategories(catData.data?.length || 0);
        }
        if (allResData?.success) {
          setTotalPlatformResources(allResData.data?.length || 0);
        }
        if (userResData?.success) {
          setUserResources(userResData.data || []);
        }
      } catch (err) {
        console.error("Failed to load user dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, API]);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/70 p-8 text-white">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              🚀 AI Learning Dashboard
            </span>

            <h1 className="mt-5 text-4xl font-bold">
              Welcome Back, {session?.user?.name?.split(" ")[0] || "Learner"} 👋
            </h1>

            <p className="mt-3 max-w-xl text-white/80">
              Manage your learning resources, explore AI recommendations,
              and continue your personalized learning journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/explore">
                <Button className="bg-white text-black font-semibold">
                  <Compass size={18} />
                  Explore Resources
                </Button>
              </Link>
              <Link href="/dashboard/user/create-resource">
                <Button className="bg-white/20 text-white font-semibold hover:bg-white/30">
                  <Plus size={18} />
                  Add Resource
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <Brain size={130} className="opacity-20" />
          </div>
        </div>
      </section>

      {/* Dynamic Stats */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/dashboard/user/resources"
          className="group rounded-3xl border bg-background p-6 shadow-sm hover:shadow-md transition"
        >
          <BookOpen className="mb-4 text-primary" size={34} />
          <h2 className="text-4xl font-bold">
            {loading ? "..." : userResources.length}
          </h2>
          <p className="mt-2 text-default-500 group-hover:text-primary transition font-medium">
            My Created Resources →
          </p>
        </Link>

        <Link
          href="/explore"
          className="group rounded-3xl border bg-background p-6 shadow-sm hover:shadow-md transition"
        >
          <Bookmark className="mb-4 text-primary" size={34} />
          <h2 className="text-4xl font-bold">
            {loading ? "..." : totalPlatformResources}
          </h2>
          <p className="mt-2 text-default-500 group-hover:text-primary transition font-medium">
            Explore All Resources →
          </p>
        </Link>

        <div className="rounded-3xl border bg-background p-6 shadow-sm">
          <Sparkles className="mb-4 text-primary" size={34} />
          <h2 className="text-4xl font-bold">
            {loading ? "..." : totalCategories}
          </h2>
          <p className="mt-2 text-default-500 font-medium">
            Learning Categories
          </p>
        </div>

        <Link
          href="/ai-workspace"
          className="group rounded-3xl border bg-background p-6 shadow-sm hover:shadow-md transition"
        >
          <Brain className="mb-4 text-primary" size={34} />
          <h2 className="text-4xl font-bold">AI Active</h2>
          <p className="mt-2 text-default-500 group-hover:text-primary transition font-medium">
            Open AI Workspace →
          </p>
        </Link>
      </section>

      {/* Bottom Sections */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* AI Assistant */}
        <div className="rounded-3xl border bg-background p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Brain size={22} />
              </div>
              <h2 className="text-xl font-semibold">Studynote AI Assistant</h2>
            </div>

            <p className="mt-4 text-default-500 leading-relaxed">
              Generate structured, comprehensive study notes on any topic with AI-powered insights, examples, and practice questions.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/dashboard/user/study-note" className="flex-1">
              <Button className="w-full bg-primary text-white font-semibold">
                Generate Study Notes
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Activity / User Resources */}
        <div className="rounded-3xl border bg-background p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Recent Resources</h2>
            <Link
              href="/dashboard/user/resources"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-default-100 animate-pulse" />
              ))}
            </div>
          ) : userResources.length ? (
            <div className="space-y-3">
              {userResources.slice(0, 4).map((resource) => (
                <div
                  key={resource._id}
                  className="flex items-center justify-between rounded-xl border p-3 hover:bg-default-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{resource.title}</p>
                      <p className="text-xs text-default-400">{resource.category} • {resource.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-default-400">
                    <Clock size={12} />
                    {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : "Recent"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-default-400">
              <BookOpen size={36} className="mb-2 opacity-40" />
              <p className="text-sm">No resources created yet</p>
              <Link href="/dashboard/user/create-resource" className="mt-3">
                <Button size="sm" variant="outline">
                  Create Resource
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
