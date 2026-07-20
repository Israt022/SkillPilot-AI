import { Badge, Button, Link } from "@heroui/react";
import {
    ArrowLeft,
    ExternalLink,
    BookOpen,
    Layers,
    GraduationCap,
} from "lucide-react";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

async function getResource(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/resource/${id}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    return data.data;
}

export default async function ResourceDetails({
    params,
}: Props) {
    const { id } = await params;

    const resource = await getResource(id);

    return (
        <div className="min-h-screen bg-default-50 py-10">
            <div className="mx-auto max-w-6xl px-5">

                <Link
                    href="/explore"
                    className="mb-6 inline-flex items-center gap-2"
                >
                    <ArrowLeft size={18} />
                    Back to Explore
                </Link>

                <div className="overflow-hidden rounded-3xl border bg-background shadow-xl">

                    <img
                        src={resource.image}
                        alt={resource.title}
                        className="h-[420px] w-full object-cover"
                    />

                    <div className="p-8">

                        <div className="flex flex-wrap gap-3">

                            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                {resource.category}
                            </span>

                            <span className="rounded-full bg-default-100 px-3 py-1 text-sm">
                                {resource.type}
                            </span>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                {resource.level}
                            </span>

                        </div>

                        <h1 className="mt-5 text-4xl font-bold">
                            {resource.title}
                        </h1>

                        <p className="mt-3 text-lg text-default-500">
                            {resource.shortDescription}
                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">

                            <div className="rounded-2xl border p-5">
                                <BookOpen className="mb-3 text-primary" />
                                <p className="text-sm text-default-500">
                                    Category
                                </p>
                                <h3 className="font-semibold">
                                    {resource.category}
                                </h3>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <Layers className="mb-3 text-primary" />
                                <p className="text-sm text-default-500">
                                    Type
                                </p>
                                <h3 className="font-semibold">
                                    {resource.type}
                                </h3>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <GraduationCap className="mb-3 text-primary" />
                                <p className="text-sm text-default-500">
                                    Level
                                </p>
                                <h3 className="font-semibold">
                                    {resource.level}
                                </h3>
                            </div>

                        </div>

                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold">
                                About this Resource
                            </h2>

                            <p className="mt-4 leading-8 text-default-600">
                                {resource.description}
                            </p>

                        </div>

                        <div className="mt-10">

                            <h2 className="mb-4 text-2xl font-semibold">
                                Skills / Tags
                            </h2>

                            <div className="flex flex-wrap gap-3">

                                {resource.tags?.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                                    >
                                        #{tag}
                                    </span>
                                ))}

                            </div>

                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">

                            <Link
                                href={resource.url}
                                target="_blank"
                                className="
                                    inline-flex items-center gap-2
                                    rounded-xl
                                    bg-black
                                    px-5 py-3
                                    text-white
                                    hover:bg-neutral-800
                                "
                            >
                                Visit Resource
                                <ExternalLink size={18} />
                            </Link>

                            <Link
                                href="/explore"
                                className="
                                    inline-flex items-center gap-2
                                    rounded-xl
                                    border
                                    px-5 py-3
                                    hover:bg-default-100
                                "
                            >
                                Back
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}