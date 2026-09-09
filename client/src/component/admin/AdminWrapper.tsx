"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


export default function AdminWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen bg-default-50 overflow-hidden">
            <AdminSidebar open={open} setOpen={setOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <AdminNavbar setOpen={setOpen} />

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
