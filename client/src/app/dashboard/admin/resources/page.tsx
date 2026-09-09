"use client";

import { useEffect, useState } from "react";
import { useAdminToken } from "@/lib/useAdminToken";
import { useSession } from "@/lib/auth-client";
import {
    BookOpen,
    Trash2,
    Search,
    ExternalLink,
    User,
    Plus,
    X,
    Sparkles,
} from "lucide-react";
import {
    Button,
    Form,
    Input,
    Label,
    Select,
    ListBox,
    TextArea,
    Fieldset,
} from "@heroui/react";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/imageUpload";

interface Resource {
    _id: string;
    title: string;
    category: string;
    type: string;
    level: string;
    image?: string;
    url?: string;
    userId: string;
    createdAt: string;
    user?: {
        name: string;
        email: string;
    };
}

interface Category {
    _id: string;
    name: string;
}

const defaultCategories = [
    { _id: "1", name: "Frontend" },
    { _id: "2", name: "Backend" },
    { _id: "3", name: "Artificial Intelligence" },
    { _id: "4", name: "Career" },
    { _id: "5", name: "DevOps" },
];

function CreateAdminResourceModal({
    open,
    setOpen,
    onSuccess,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSuccess: () => void;
}) {
    const { data: session } = useSession();
    const [categories, setCategories] = useState<Category[]>(defaultCategories);
    const [selectedCategory, setSelectedCategory] = useState("Frontend");
    const [selectedType, setSelectedType] = useState("Course");
    const [selectedLevel, setSelectedLevel] = useState("Beginner");
    const [tags, setTags] = useState<string[]>([]);
    const [preview, setPreview] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const resourceTags = [
        "React",
        "Next.js",
        "Node.js",
        "AI",
        "Database",
        "Career",
        "Python",
        "TypeScript",
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
                const data = await res.json();
                if (data.success && data.data?.length) {
                    setCategories(data.data);
                    setSelectedCategory(data.data[0].name);
                }
            } catch (err) {
                console.error("Failed to load categories:", err);
            }
        };
        fetchCategories();
    }, []);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const activeUserId = session?.user?.id || (session?.user as any)?._id;

        if (!activeUserId) {
            toast.error("User session not found");
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const imageFile = formData.get("image") as File;

            let uploadedUrl = "";
            if (imageFile && imageFile.size > 0) {
                const uploadedImage = await imgUpload(imageFile);
                uploadedUrl = uploadedImage?.url || "";
            }

            const resourceData = {
                title: formData.get("title"),
                category: selectedCategory || formData.get("category") || "General",
                type: selectedType || formData.get("type") || "Article",
                level: selectedLevel || formData.get("level") || "Beginner",
                shortDescription: formData.get("shortDescription"),
                description: formData.get("description"),
                url: formData.get("url"),
                image: uploadedUrl,
                tags,
                userId: activeUserId,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/resources`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resourceData),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to create resource");
                return;
            }

            toast.success("Resource created successfully!");
            setOpen(false);
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-default-200 bg-background p-6 sm:p-8 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-6 right-6 rounded-xl p-2 text-default-400 hover:bg-default-100 transition"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-600">
                        <Sparkles size={14} />
                        Admin Resource Manager
                    </span>
                    <h2 className="mt-3 text-2xl font-bold">Add Platform Resource</h2>
                    <p className="mt-1 text-sm text-default-500">
                        Create a new learning resource available across SkillPilot AI.
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <Fieldset className="rounded-2xl border border-default-200 p-5">
                        <Fieldset.Legend className="text-sm font-semibold text-default-700">
                            Resource Details
                        </Fieldset.Legend>
                        <Fieldset.Group className="space-y-4">
                            <div>
                                <Label>Resource Title</Label>
                                <Input
                                    name="title"
                                    placeholder="e.g. Master Next.js 15 & React Server Components"
                                    required
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label>Category</Label>
                                    <Select
                                        name="category"
                                        selectedKey={selectedCategory}
                                        onSelectionChange={(key) => {
                                            if (key) setSelectedCategory(String(key));
                                        }}
                                    >
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                {categories.map((c) => (
                                                    <ListBox.Item key={c._id} id={c.name}>
                                                        {c.name}
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Resource Type</Label>
                                    <Select
                                        name="type"
                                        selectedKey={selectedType}
                                        onSelectionChange={(key) => {
                                            if (key) setSelectedType(String(key));
                                        }}
                                    >
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="Course">Course</ListBox.Item>
                                                <ListBox.Item id="Article">Article</ListBox.Item>
                                                <ListBox.Item id="Video">Video</ListBox.Item>
                                                <ListBox.Item id="Documentation">Documentation</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label>Difficulty Level</Label>
                                <Select
                                    name="level"
                                    selectedKey={selectedLevel}
                                    onSelectionChange={(key) => {
                                        if (key) setSelectedLevel(String(key));
                                    }}
                                >
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="Beginner">Beginner</ListBox.Item>
                                            <ListBox.Item id="Intermediate">Intermediate</ListBox.Item>
                                            <ListBox.Item id="Advanced">Advanced</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Description */}
                    <Fieldset className="rounded-2xl border border-default-200 p-5">
                        <Fieldset.Legend className="text-sm font-semibold text-default-700">
                            Description
                        </Fieldset.Legend>
                        <Fieldset.Group className="space-y-4">
                            <div>
                                <Label>Short Description</Label>
                                <Input
                                    name="shortDescription"
                                    placeholder="Brief overview of what learners will get"
                                />
                            </div>
                            <div>
                                <Label>Full Description</Label>
                                <TextArea
                                    name="description"
                                    placeholder="Detailed description, outline, or key topics covered..."
                                    className="min-h-24"
                                />
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Link & Media */}
                    <Fieldset className="rounded-2xl border border-default-200 p-5">
                        <Fieldset.Legend className="text-sm font-semibold text-default-700">
                            Link & Media
                        </Fieldset.Legend>
                        <Fieldset.Group className="space-y-4">
                            <div>
                                <Label>Resource URL</Label>
                                <Input
                                    name="url"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <Label>Thumbnail / Cover Image</Label>
                                <label
                                    htmlFor="admin-resource-image"
                                    className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-default-300 hover:border-violet-500 transition"
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="h-full w-full rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center p-4">
                                            <BookOpen size={28} className="text-default-400 mb-2" />
                                            <p className="text-sm font-medium">Click to select image</p>
                                            <p className="text-xs text-default-400 mt-0.5">PNG, JPG, WebP</p>
                                        </div>
                                    )}
                                </label>
                                <Input
                                    id="admin-resource-image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Tags */}
                    <Fieldset className="rounded-2xl border border-default-200 p-5">
                        <Fieldset.Legend className="text-sm font-semibold text-default-700">
                            Tags & Skills
                        </Fieldset.Legend>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {resourceTags.map((tag) => {
                                const isSelected = tags.includes(tag);
                                return (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => {
                                            setTags((prev) =>
                                                prev.includes(tag)
                                                    ? prev.filter((t) => t !== tag)
                                                    : [...prev, tag]
                                            );
                                        }}
                                        className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                                            isSelected
                                                ? "bg-violet-600 text-white shadow-sm"
                                                : "border border-default-200 hover:border-violet-400 hover:bg-violet-50/10 text-default-600"
                                        }`}
                                    >
                                        {isSelected && "✓ "}
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    </Fieldset>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            isDisabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isDisabled={submitting}
                            className="bg-violet-600 text-white font-semibold"
                        >
                            {submitting ? "Creating..." : "Create Resource"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default function AdminResourcesPage() {
    const token = useAdminToken();
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const API = process.env.NEXT_PUBLIC_SERVER_URL;

    const fetchResources = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API}/admin/resources`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setResources(data.data);
        } catch {
            toast.error("Failed to load resources");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchResources();
    }, [token]);

    const deleteResource = async (id: string, title: string) => {
        if (!confirm(`Delete resource "${title}"? This cannot be undone.`)) return;
        if (!token) return;
        setDeletingId(id);
        try {
            const res = await fetch(`${API}/admin/resources/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Resource deleted");
                fetchResources();
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to delete resource");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = resources.filter(
        (r) =>
            r.title?.toLowerCase().includes(search.toLowerCase()) ||
            r.category?.toLowerCase().includes(search.toLowerCase()) ||
            r.user?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const levelColor: Record<string, string> = {
        beginner: "bg-emerald-500/10 text-emerald-600",
        intermediate: "bg-amber-500/10 text-amber-600",
        advanced: "bg-red-500/10 text-red-600",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <BookOpen size={28} className="text-violet-500" />
                        All Resources
                    </h1>
                    <p className="mt-1 text-default-500">
                        {resources.length} resource{resources.length !== 1 ? "s" : ""} on the platform
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search resources..."
                            className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus:border-violet-400"
                        />
                    </div>

                    {/* Create Resource Button */}
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-violet-600 text-white font-semibold"
                    >
                        <Plus size={18} />
                        Create Resource
                    </Button>
                </div>
            </div>

            {/* Create Resource Modal */}
            <CreateAdminResourceModal
                open={showCreateModal}
                setOpen={setShowCreateModal}
                onSuccess={fetchResources}
            />

            {/* Resource Grid */}
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-52 rounded-2xl bg-default-100 animate-pulse" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-background py-20 text-default-400">
                    <BookOpen size={48} className="mb-4 opacity-30" />
                    <p className="text-lg font-medium">No resources found</p>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-4 bg-violet-600 text-white"
                        size="sm"
                    >
                        <Plus size={16} />
                        Add First Resource
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((resource) => (
                        <div
                            key={resource._id}
                            className="group rounded-2xl border bg-background overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            {/* Image */}
                            <div className="relative h-40 bg-default-100 overflow-hidden">
                                {resource.image ? (
                                    <img
                                        src={resource.image}
                                        alt={resource.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <BookOpen size={40} className="text-default-300" />
                                    </div>
                                )}
                                {/* Delete overlay */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => deleteResource(resource._id, resource.title)}
                                        disabled={deletingId === resource._id}
                                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-danger text-white shadow-lg hover:bg-danger/90 transition"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold line-clamp-1 flex-1">
                                        {resource.title}
                                    </h3>
                                    {resource.url && (
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shrink-0 text-default-400 hover:text-primary"
                                        >
                                            <ExternalLink size={15} />
                                        </a>
                                    )}
                                </div>

                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    <span className="rounded-full bg-default-100 px-2 py-0.5 text-xs text-default-500">
                                        {resource.category}
                                    </span>
                                    <span className="rounded-full bg-default-100 px-2 py-0.5 text-xs text-default-500">
                                        {resource.type}
                                    </span>
                                    {resource.level && (
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs ${
                                                levelColor[resource.level?.toLowerCase()] ||
                                                "bg-default-100 text-default-500"
                                            }`}
                                        >
                                            {resource.level}
                                        </span>
                                    )}
                                </div>

                                {/* Owner */}
                                {resource.user && (
                                    <div className="mt-3 flex items-center gap-2 text-xs text-default-400 border-t pt-3">
                                        <User size={12} />
                                        <span>{resource.user.name}</span>
                                        <span className="text-default-300">·</span>
                                        <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
