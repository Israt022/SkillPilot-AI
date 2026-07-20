"use client";

import { useSession } from "@/lib/auth-client";
import { User, Mail } from "lucide-react";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-default-500">Loading profile...</p>
            </main>
        );
    }

    if (!session) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-default-500">
                    Please login to view profile.
                </p>
            </main>
        );
    }


    const user = session.user;


    return (
        <main className="flex-1 px-4 py-20">
            <section className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-default-200 bg-background p-8 shadow-lg">
                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                            <User size={36} />
                        </div>
                        <h1 className="mt-4 text-3xl font-bold">
                            {user.name || "User"}
                        </h1>
                        <p className="mt-1 text-default-500">
                            SkillPilot AI Member
                        </p>
                    </div>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4 rounded-xl border p-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                                <User className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-default-400">
                                    Name
                                </p>
                                <p className="font-medium">
                                    {user.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border p-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                                <Mail className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-default-400">
                                    Email
                                </p>
                                <p className="font-medium">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}