"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    BookOpen,
    X,
    ShieldCheck,
    LogOut,
    BarChart3,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const adminMenus = [
    {
        title: "Overview",
        href: "/dashboard/admin",
        icon: BarChart3,
    },
    {
        title: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
    },
    {
        title: "Categories",
        href: "/dashboard/admin/categories",
        icon: FolderKanban,
    },
    {
        title: "Resources",
        href: "/dashboard/admin/resources",
        icon: BookOpen,
    },
    {
        title: "Profile",
        href: "/dashboard/admin/profile",
        icon: BookOpen,
    },
];

export default function AdminSidebar({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace("/login");
    };

    return (
        <aside
            className={`
        fixed top-0 left-0 z-50 h-screen w-72
        border-r bg-background
        transition-transform duration-300
        lg:static lg:flex lg:flex-col lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
    `}
        >
            {/* Mobile close */}
            <div className="flex justify-end p-4 lg:hidden">
                <Button onClick={() => setOpen(false)}>
                    <X />
                </Button>
            </div>

            {/* Brand */}
            <div className="pt-3 mt-3 border-t border-default-200">
                <Link href="/">
                    <div className="border-b p-6">
                        <h2 className="text-2xl font-bold">
                            SkillPilot AI
                        </h2>
                        <p className="text-sm text-default-500">
                            Admin Dashboard
                        </p>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 p-4">
                {adminMenus.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        item.href === "/dashboard/admin"
                            ? pathname === "/dashboard/admin"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                ? "bg-danger text-white"
                                : "hover:bg-default-100"
                                }`}
                        >
                            <Icon size={20} />
                            {item.title}
                        </Link>
                    );
                })}

                {/* Back to user dashboard */}
                {/* <div className="pt-4 border-t border-default-200 mt-4">
                    <Link
                        href="/dashboard/user"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-default-100 text-default-500"
                    >
                        <LayoutDashboard size={20} />
                        User Dashboard
                    </Link>
                </div> */}
            </nav>

            {/* Logout */}
            <div className="border-t p-4">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-danger/10 text-danger"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
