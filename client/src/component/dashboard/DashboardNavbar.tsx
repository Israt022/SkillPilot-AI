"use client";

import { Bell, Search } from "lucide-react";
import { Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export default function DashboardNavbar() {

    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-background px-6">

            <div className="relative w-80">

                <Search
                    className="absolute left-3 top-3.5 text-default-400"
                    size={18}
                />

                <input
                    placeholder="Search..."
                    className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-primary"
                />

            </div>

            <div className="flex items-center gap-5">

                <button className="rounded-xl border p-3">
                    <Bell size={18} />
                </button>

                <div className="flex items-center gap-3">

                    <Avatar>
                        <Avatar.Image
                            src={session?.user?.image || ""}
                            alt={session?.user?.name || "User"}
                        />

                        <Avatar.Fallback>
                            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div>
                        <h4 className="font-semibold">
                            {session?.user?.name}
                        </h4>

                        <p className="text-xs text-default-500">
                            {session?.user?.email}
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}