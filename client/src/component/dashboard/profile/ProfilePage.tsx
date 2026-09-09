"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { User, Mail, Camera, Pencil, Save } from "lucide-react";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/imageUpload";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [preview, setPreview] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    if (isPending) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-default-500">
                    Loading profile...
                </p>
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

    const handleEdit = () => {
        setName(user.name || "");
        setPreview(user.image || "");
        setImageFile(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(user.name || "");
        setPreview(user.image || "");
        setImageFile(null);
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Optional validation
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setImageFile(file);

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            setIsSaving(true);

            let uploadedUrl = user.image || "";

            // Upload new image using the same imgUpload()
            // used in CreateResourceForm
            if (imageFile) {
                const uploadedImage = await imgUpload(imageFile);

                uploadedUrl = uploadedImage?.url || "";

                if (!uploadedUrl) {
                    toast.error("Image upload failed");
                    return;
                }
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile/${user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        image: uploadedUrl,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(
                    data.message || "Failed to update profile"
                );
                return;
            }

            toast.success("Profile updated successfully!");

            setIsEditing(false);
            setImageFile(null);

            // Reload session data
            window.location.reload();
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong!");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="flex-1 px-4 py-10 md:py-16">
            <section className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-default-200 bg-background p-6 shadow-lg md:p-8">

                    {/* Profile Header */}
                    <div className="mb-8 flex flex-col items-center text-center">

                        {/* Profile Image */}
                        <div className="relative">

                            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary text-white ring-4 ring-primary/10">

                                {preview || user.image ? (
                                    <img
                                        src={preview || user.image || ""}
                                        alt={user.name || "Profile"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User size={40} />
                                )}

                            </div>

                            {/* Camera Button */}
                            {isEditing && (
                                <>
                                    <label
                                        htmlFor="profile-image"
                                        className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:scale-105"
                                    >
                                        <Camera size={18} />
                                    </label>

                                    <input
                                        id="profile-image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </>
                            )}
                        </div>

                        <h1 className="mt-4 text-3xl font-bold">
                            {user.name || "User"}
                        </h1>

                        <p className="mt-1 text-default-500">
                            SkillPilot AI Member
                        </p>
                    </div>

                    {/* Edit Mode */}
                    {isEditing ? (
                        <div className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Name
                                </label>

                                <Input
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email
                                </label>

                                <Input
                                    value={user.email || ""}
                                    readOnly
                                    className="opacity-70"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-3">

                                <Button
                                    type="button"
                                    // variant="flat"
                                    className="flex-1"
                                    onClick={handleCancel}
                                // disabled={isSaving}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="button"
                                    className="flex-1 bg-primary text-white"
                                    onClick={handleSave}
                                // disabled={isSaving}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Save size={18} />

                                        {isSaving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </span>
                                </Button>

                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Profile Information */}
                            <div className="space-y-5">

                                {/* Name */}
                                <div className="flex items-center gap-4 rounded-xl border border-default-200 p-4">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        <User
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-default-400">
                                            Name
                                        </p>

                                        <p className="truncate font-medium">
                                            {user.name || "Not set"}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-4 rounded-xl border border-default-200 p-4">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        <Mail
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-default-400">
                                            Email
                                        </p>

                                        <p className="truncate font-medium">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Edit Button */}
                            <Button
                                type="button"
                                className="mt-6 w-full bg-primary text-white"
                                onClick={handleEdit}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Pencil size={18} />
                                    Edit Profile
                                </span>
                            </Button>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

