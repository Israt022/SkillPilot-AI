"use client";

import { Bell, Menu, ShieldCheck } from "lucide-react";
import { Avatar, Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export default function AdminNavbar({
    setOpen,
}: {
    setOpen: (value: boolean) => void;
}) {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
                <Button onClick={() => setOpen(true)} className="lg:hidden">
                    <Menu size={24} />
                </Button>

                {/* Admin badge */}
                <div className="hidden lg:flex items-center gap-2 rounded-full bg-danger/10 px-3 py-1.5">
                    <ShieldCheck size={14} className="text-danger" />
                    <span className="text-xs font-semibold text-danger">Admin Mode</span>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <button className="rounded-xl border p-3">
                    <Bell size={18} />
                </button>

                <div className="flex items-center gap-3">
                    <Avatar>
                        <Avatar.Image
                            src={session?.user?.image || ""}
                            alt={session?.user?.name || "Admin"}
                        />
                        <Avatar.Fallback>
                            {session?.user?.name?.charAt(0).toUpperCase() || "A"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div>
                        <h4 className="font-semibold">{session?.user?.name}</h4>
                        <p className="text-xs text-danger font-medium">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
