"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Compass,
    Brain,
    PlusSquare,
    FolderKanban,
    User,
    LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const menus = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Explore",
        href: "/explore",
        icon: Compass,
    },
    {
        title: "AI Workspace",
        href: "/ai-workspace",
        icon: Brain,
    },
    {
        title: "Add Resource",
        href: "/dashboard/add-resource",
        icon: PlusSquare,
    },
    {
        title: "Manage Resources",
        href: "/dashboard/manage-resource",
        icon: FolderKanban,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export default function DashboardSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace("/login");
    };

    return (
        <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">

            <Link href={'/'}>
                <div className="border-b p-6">

                    <h2 className="text-2xl font-bold">
                        SkillPilot AI
                    </h2>

                    <p className="text-sm text-default-500">
                        Learning Dashboard
                    </p>

                </div>
            </Link>

            <nav className="flex-1 space-y-2 p-4">

                {menus.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${pathname === item.href
                                ? "bg-primary text-white"
                                : "hover:bg-default-100"
                                }`}
                        >
                            <Icon size={20} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t p-4">

                <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-danger/10">
                    <LogOut size={20} />
                    Logout
                </button>

            </div>
        </aside>
    );
}