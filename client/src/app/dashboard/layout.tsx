"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import DashboardSidebar from "@/component/dashboard/DashboardSidebar";
import DashboardNavbar from "@/component/dashboard/DashboardNavbar";
import AdminSidebar from "@/component/admin/AdminSidebar";
import AdminNavbar from "@/component/admin/AdminNavbar";
import DashboardRouteLoader from "@/component/dashboard/DashboardRouteLoader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    // If at root /dashboard, no layout wrapper needed (redirects immediately)
    if (pathname === "/dashboard") {
        return <>{children}</>;
    }

    const isAdmin =
        pathname.startsWith("/dashboard/admin") ||
        (session?.user as any)?.role === "admin";

    return (
        <div className="flex h-screen bg-default-50 overflow-hidden">
            {isAdmin ? (
                <AdminSidebar open={open} setOpen={setOpen} />
            ) : (
                <DashboardSidebar open={open} setOpen={setOpen} />
            )}

            <div className="flex flex-1 flex-col overflow-hidden">
                {isAdmin ? (
                    <AdminNavbar setOpen={setOpen} />
                ) : (
                    <DashboardNavbar setOpen={setOpen} />
                )}

                <main className="flex-1 overflow-y-auto p-6">
                    <DashboardRouteLoader>
                        {children}
                    </DashboardRouteLoader>
                </main>
            </div>
        </div>
    );
}