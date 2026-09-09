"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Users,
    BookOpen,
    FolderKanban,
    TrendingUp,
    ShieldCheck,
    Clock,
    ArrowRight,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useAdminToken } from "@/lib/useAdminToken";

interface Stats {
    totalUsers: number;
    totalResources: number;
    totalCategories: number;
    recentResources: any[];
    recentUsers: any[];
}

interface Category {
    _id: string;
    name: string;
    icon: string;
    color: string;
    description?: string;
}

function StatCard({
    icon: Icon,
    label,
    value,
    color,
    bg,
    href,
}: {
    icon: any;
    label: string;
    value: number | string;
    color: string;
    bg: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="group rounded-3xl border bg-background p-6 shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
            <div className="flex items-center gap-5">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${bg}`}>
                    <Icon size={26} className={color} />
                </div>
                <div>
                    <p className="text-sm text-default-500">{label}</p>
                    <h2 className="text-3xl font-bold mt-0.5">{value}</h2>
                </div>
            </div>
            <ArrowRight size={20} className="text-default-300 group-hover:text-default-600 group-hover:translate-x-1 transition" />
        </Link>
    );
}

export default function AdminOverviewPage() {
    const { data: session } = useSession();
    const token = useAdminToken();
    const [stats, setStats] = useState<Stats | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const API = process.env.NEXT_PUBLIC_SERVER_URL;

    useEffect(() => {
        const fetchAllData = async () => {
            if (!token) return;
            try {
                const [statsRes, catRes] = await Promise.all([
                    fetch(`${API}/admin/stats`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${API}/admin/categories`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const [statsData, catData] = await Promise.all([
                    statsRes.json(),
                    catRes.json(),
                ]);

                if (statsData.success) setStats(statsData.data);
                if (catData.success) setCategories(catData.data);
            } catch (err) {
                console.error("Failed to fetch admin overview data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchAllData();
        }
    }, [token, API]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-danger via-danger/80 to-danger/60 p-8 text-white">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div>
                        <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 w-fit">
                            <ShieldCheck size={14} />
                            <span className="text-sm font-semibold">Admin Control Center</span>
                        </div>
                        <h1 className="mt-5 text-4xl font-bold">
                            Welcome, {session?.user?.name?.split(" ")[0]} 👋
                        </h1>
                        <p className="mt-3 max-w-xl text-white/80">
                            Monitor and manage users, platform categories, and resources with real-time updates.
                        </p>
                    </div>
                    <ShieldCheck size={120} className="hidden lg:block opacity-20" />
                </div>
            </section>

            {/* Dynamic Stats Grid */}
            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-3xl border bg-background p-6 h-28 animate-pulse" />
                    ))}
                </div>
            ) : (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <StatCard
                        icon={Users}
                        label="Total Users"
                        value={stats?.totalUsers ?? 0}
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                        href="/dashboard/admin/users"
                    />
                    <StatCard
                        icon={BookOpen}
                        label="Total Resources"
                        value={stats?.totalResources ?? 0}
                        color="text-violet-500"
                        bg="bg-violet-500/10"
                        href="/dashboard/admin/resources"
                    />
                    <StatCard
                        icon={FolderKanban}
                        label="Total Categories"
                        value={stats?.totalCategories ?? categories.length}
                        color="text-emerald-500"
                        bg="bg-emerald-500/10"
                        href="/dashboard/admin/categories"
                    />
                </section>
            )}

            {/* Dynamic Categories Section */}
            <section className="rounded-3xl border bg-background p-6">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <FolderKanban size={20} className="text-emerald-500" />
                        <h2 className="text-lg font-semibold">Active Categories</h2>
                    </div>
                    <Link
                        href="/dashboard/admin/categories"
                        className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                        Manage Categories <ArrowRight size={14} />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-16 rounded-2xl bg-default-100 animate-pulse" />
                        ))}
                    </div>
                ) : categories.length ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((cat) => (
                            <div
                                key={cat._id}
                                className="flex items-center gap-3 rounded-2xl border p-3 bg-default-50/50"
                            >
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                                    style={{ backgroundColor: (cat.color || "#10b981") + "20" }}
                                >
                                    {cat.icon || "📚"}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-sm truncate">{cat.name}</p>
                                    <p className="text-xs text-default-400 truncate">{cat.description || "Category"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-default-400 text-sm">No categories created yet.</p>
                )}
            </section>

            {/* Dynamic Recent Users & Resources */}
            <section className="grid gap-6 lg:grid-cols-2">
                {/* Recent Users */}
                <div className="rounded-3xl border bg-background p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <Users size={20} className="text-blue-500" />
                            <h2 className="text-lg font-semibold">Recent Users</h2>
                        </div>
                        <Link
                            href="/dashboard/admin/users"
                            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-12 rounded-xl bg-default-100 animate-pulse" />
                            ))}
                        </div>
                    ) : stats?.recentUsers?.length ? (
                        <div className="space-y-3">
                            {stats.recentUsers.map((user: any) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between rounded-xl border p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold text-sm">
                                            {user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{user.name}</p>
                                            <p className="text-xs text-default-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === "admin"
                                                ? "bg-danger/10 text-danger"
                                                : "bg-default-100 text-default-500"
                                            }`}
                                    >
                                        {user.role || "user"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-default-400 text-sm">No users yet.</p>
                    )}
                </div>

                {/* Recent Resources */}
                <div className="rounded-3xl border bg-background p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <BookOpen size={20} className="text-violet-500" />
                            <h2 className="text-lg font-semibold">Recent Resources</h2>
                        </div>
                        <Link
                            href="/dashboard/admin/resources"
                            className="text-xs font-semibold text-violet-600 hover:underline flex items-center gap-1"
                        >
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-12 rounded-xl bg-default-100 animate-pulse" />
                            ))}
                        </div>
                    ) : stats?.recentResources?.length ? (
                        <div className="space-y-3">
                            {stats.recentResources.map((res: any) => (
                                <div
                                    key={res._id}
                                    className="flex items-center justify-between rounded-xl border p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                                            <BookOpen size={16} className="text-violet-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm line-clamp-1">{res.title}</p>
                                            <p className="text-xs text-default-400">{res.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-default-400">
                                        <Clock size={12} />
                                        {new Date(res.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-default-400 text-sm">No resources yet.</p>
                    )}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-3xl border bg-background p-6">
                <div className="flex items-center gap-3 mb-5">
                    <TrendingUp size={20} className="text-primary" />
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { label: "Manage Users", href: "/dashboard/admin/users", color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20", icon: Users },
                        { label: "Manage Categories", href: "/dashboard/admin/categories", color: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20", icon: FolderKanban },
                        { label: "View All Resources", href: "/dashboard/admin/resources", color: "bg-violet-500/10 text-violet-600 hover:bg-violet-500/20", icon: BookOpen },
                    ].map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.href}
                                href={action.href}
                                className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-semibold transition ${action.color}`}
                            >
                                <Icon size={18} />
                                {action.label}
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
