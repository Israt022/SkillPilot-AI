"use client";

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

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { imgUpload } from "@/lib/imageUpload";
import { useSession } from "@/lib/auth-client";

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
    { _id: "6", name: "Mobile Development" },
];

const CreateResourceForm = ({ user }: { user: any }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [tags, setTags] = useState<string[]>([]);
    const [preview, setPreview] = useState("");
    const [categories, setCategories] = useState<Category[]>(defaultCategories);
    const [selectedCategory, setSelectedCategory] = useState("Frontend");
    const [selectedType, setSelectedType] = useState("Course");
    const [selectedLevel, setSelectedLevel] = useState("Beginner");

    const resourceTags = [
        "React",
        "Next.js",
        "Node.js",
        "AI",
        "Database",
        "Career",
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

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const activeUser = user || session?.user;
        const activeUserId = activeUser?.id || activeUser?._id;

        if (!activeUserId) {
            toast.error("Please login to create a resource");
            return;
        }

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

        try {
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
            router.push("/dashboard/user/resources");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-default-200 bg-background p-8 shadow-xl">
                    {/* Header */}
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                            <Sparkles size={16} />
                            Create Resource
                        </span>
                        <h1 className="mt-4 text-4xl font-bold">
                            Add Learning Resource
                        </h1>
                        <p className="mt-2 text-default-500">
                            Share useful learning materials with SkillPilot AI community.
                        </p>
                    </div>

                    <Form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        {/* Basic Information */}
                        <Fieldset className="rounded-2xl border border-default-200 p-6">
                            <Fieldset.Legend className="text-lg font-semibold">
                                Resource Information
                            </Fieldset.Legend>
                            <Fieldset.Group className="space-y-5">
                                <div>
                                    <Label>
                                        Resource Title
                                    </Label>
                                    <Input
                                        name="title"
                                        placeholder="Learn React Hooks"
                                        required
                                    />
                                </div>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <Label>
                                            Category
                                        </Label>
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
                                        <Label>
                                            Resource Type
                                        </Label>
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
                                                    <ListBox.Item id="Course">
                                                        Course
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Article">
                                                        Article
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Video">
                                                        Video
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Documentation">
                                                        Documentation
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label>
                                        Difficulty Level
                                    </Label>
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
                                                <ListBox.Item id="Beginner">
                                                    Beginner
                                                </ListBox.Item>
                                                <ListBox.Item id="Intermediate">
                                                    Intermediate
                                                </ListBox.Item>
                                                <ListBox.Item id="Advanced">
                                                    Advanced
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </Fieldset.Group>
                        </Fieldset>

                        {/* Description */}
                        <Fieldset className="rounded-2xl border border-default-200 p-6">
                            <Fieldset.Legend className="text-lg font-semibold">
                                Description
                            </Fieldset.Legend>
                            <Fieldset.Group className="space-y-5">
                                <div>
                                    <Label>
                                        Short Description
                                    </Label>
                                    <Input
                                        name="shortDescription"
                                        placeholder="Short summary about this resource"
                                    />
                                </div>
                                <div>
                                    <Label>
                                        Full Description
                                    </Label>
                                    <TextArea
                                        name="description"
                                        placeholder="Explain this resource..."
                                        className="min-h-32"
                                    />
                                </div>
                            </Fieldset.Group>
                        </Fieldset>

                        {/* Links */}
                        <Fieldset className="rounded-2xl border border-default-200 p-6">
                            <Fieldset.Legend className="text-lg font-semibold">
                                Resource Link
                            </Fieldset.Legend>
                            <Fieldset.Group className="space-y-5">
                                <div>
                                    <Label>
                                        Resource URL
                                    </Label>
                                    <Input
                                        name="url"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>
                                        Resource Image
                                    </Label>
                                    <label
                                        htmlFor="image"
                                        className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-default-300 hover:border-primary transition"
                                    >
                                        {
                                            preview ? (
                                                <img
                                                    src={preview}
                                                    alt="preview"
                                                    className="h-full w-full rounded-2xl object-cover"
                                                />
                                            ) : (
                                                <>
                                                    <div className="text-4xl">
                                                        🖼️
                                                    </div>
                                                    <p className="mt-3 font-semibold">
                                                        Upload Resource Image
                                                    </p>
                                                    <p className="text-sm text-default-500">
                                                        Click to select image
                                                    </p>
                                                </>
                                            )
                                        }
                                    </label>
                                    <Input
                                        id="image"
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
                        <Fieldset className="rounded-2xl border border-default-200 p-6">
                            <Fieldset.Legend className="text-lg font-semibold">
                                Skills / Tags
                            </Fieldset.Legend>
                            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                                {resourceTags.map((tag) => {
                                    const selected = tags.includes(tag);
                                    return (
                                        <button
                                            type="button"
                                            key={tag}
                                            onClick={() => {
                                                setTags(prev =>
                                                    prev.includes(tag)
                                                        ? prev.filter(t => t !== tag)
                                                        : [...prev, tag]
                                                );
                                            }}
                                            className={`
                        flex items-center justify-center gap-2 rounded-xl border px-4 py-3 
                        text-sm font-semibold transition-all duration-200
                        ${selected
                                                    ? "border-primary bg-primary text-white shadow-md scale-[1.02]"
                                                    : "border-default-200 hover:border-primary hover:bg-primary/5"
                                                }
                    `}
                                        >
                                            {selected && (
                                                <span>
                                                    ✓
                                                </span>
                                            )}
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Selected Tags Preview */}
                            {
                                tags.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {
                                            tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </Fieldset>

                        <Button
                            type="submit"
                            className="w-full bg-primary text-white"
                            size="lg"
                        >
                            Create Resource
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateResourceForm;