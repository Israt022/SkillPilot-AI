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
    X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

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
        title: "Create Resource",
        href: "/dashboard/create-resource",
        icon: PlusSquare,
    },
    {
        title: "My Resources",
        href: "/dashboard/resource",
        icon: FolderKanban,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export default function DashboardSidebar({
    open,
    setOpen
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
            {/* mobile close */}

            <div className="flex justify-end p-4 lg:hidden">

                <Button onClick={() => setOpen(false)}>
                    <X />
                </Button>

            </div>
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