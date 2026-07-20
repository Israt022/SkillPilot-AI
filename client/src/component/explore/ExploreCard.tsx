"use client";

import { Button, Link } from "@heroui/react";
import { ExternalLink, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const ExploreCard = ({
    resource
}: {
    resource: any
}) => {
    const router = useRouter();

    return (
        <div
            key={resource._id}
            className="overflow-hidden rounded-2xl border border-default-200 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >

            <img
                src={resource.image}
                alt={resource.title}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">

                <h2 className="text-xl font-bold line-clamp-1">
                    {resource.title}
                </h2>

                <p className="mt-2 text-sm text-default-500 line-clamp-2">
                    {resource.shortDescription}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                        {resource.category}
                    </span>

                    <span className="rounded-full bg-default-100 px-3 py-1 text-xs">
                        {resource.type}
                    </span>

                    <span className="rounded-full bg-default-100 px-3 py-1 text-xs">
                        {resource.level}
                    </span>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                    {resource.tags?.map((tag: string) => (
                        <span
                            key={tag}
                            className="rounded-full border px-3 py-1 text-xs"
                        >
                            #{tag}
                        </span>
                    ))}

                </div>

                <div className="mt-6 flex gap-3">

                    <Button
                        variant="ghost"
                        className="flex-1"
                        onClick={() => router.push(`/explore/${resource._id}`)}
                    >
                        <Eye size={16} />
                        <span>View</span>
                    </Button>

                    <Link
                        href={resource.url}
                        target="_blank"
                        className="
                                    flex flex-1 items-center justify-center gap-2
                                    rounded-xl
                                    bg-black
                                    px-4 py-2
                                    text-white
                                    transition
                                    hover:bg-neutral-800
                                "
                    >
                        <span>Visit</span>
                        <ExternalLink size={16} />
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ExploreCard;