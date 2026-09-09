"use client";

import { useEffect, useState } from "react";
import ResourceItem from "./ResourceItem";
import { useSession } from "@/lib/auth-client";
import { FolderKanban, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function ResourceList({
    user
}: {
    user: any
}) {
    const { data: session } = useSession();
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const activeUser = user || session?.user;
    const userId = activeUser?.id || activeUser?._id;

    useEffect(() => {
        const fetchResources = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/resources/${userId}`
                );
                const data = await res.json();
                if (data.success) {
                    setResources(data.data || []);
                }
            } catch (err) {
                console.error("Failed to load user resources:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [userId]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 rounded-2xl border bg-background p-4 animate-pulse" />
                ))}
            </div>
        );
    }

    if (resources.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border bg-background p-12 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    <FolderKanban size={32} />
                </div>
                <h3 className="text-xl font-bold">No resources found</h3>
                <p className="mt-2 text-default-500 max-w-sm">
                    You haven't created any learning resources yet. Start sharing with the community.
                </p>
                <Link href="/dashboard/user/create-resource" className="mt-6">
                    <Button className="bg-primary text-white">
                        <Plus size={18} />
                        Create Your First Resource
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {resources.map((resource) => (
                <ResourceItem
                    key={resource._id}
                    resource={resource}
                />
            ))}
        </div>
    );
}