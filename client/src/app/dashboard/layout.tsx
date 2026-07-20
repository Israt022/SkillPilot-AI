// app/dashboard/layout.tsx

import DashboardNavbar from "@/component/dashboard/DashboardNavbar";
import DashboardSidebar from "@/component/dashboard/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-default-50">

            <DashboardSidebar />

            <div className="flex flex-1 flex-col">

                <DashboardNavbar />

                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}