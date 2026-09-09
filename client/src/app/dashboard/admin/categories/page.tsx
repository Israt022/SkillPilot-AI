"use client";

import { useEffect, useState } from "react";
import { useAdminToken } from "@/lib/useAdminToken";
import { FolderKanban, Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

interface Category {
    _id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    createdAt: string;
}

// const EMOJI_OPTIONS = ["📚", "💻", "🎨", "🔬", "🏆", "🚀", "🧠", "⚡", "🌐", "🔧", "📊", "🎯"];
// const COLOR_OPTIONS = [
//     "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
//     "#ef4444", "#ec4899", "#f97316", "#3b82f6", "#14b8a6",
// ];

function CategoryForm({
    initial,
    onSave,
    onCancel,
    loading,
}: {
    initial?: Partial<Category>;
    onSave: (data: Partial<Category>) => void;
    onCancel: () => void;
    loading: boolean;
}) {
    const [name, setName] = useState(initial?.name || "");
    const [description, setDescription] = useState(initial?.description || "");
    const [icon, setIcon] = useState(initial?.icon || "📚");
    const [color, setColor] = useState(initial?.color || "#6366f1");

    return (
        <div className="rounded-2xl border bg-background p-6 space-y-5">
            <h3 className="text-lg font-semibold">
                {initial?._id ? "Edit Category" : "New Category"}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-default-600">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Web Development"
                        className="w-full rounded-xl border bg-default-50 px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-default-600">
                        Description
                    </label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Short description..."
                        className="w-full rounded-xl border bg-default-50 px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* Icon & Color inputs */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-default-600">Icon (Emoji)</label>
                    <input
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="e.g. 📚, 💻, 🚀, 🧠"
                        className="w-full rounded-xl border bg-default-50 px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-default-600">Color (Hex Code)</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-12 rounded-lg border cursor-pointer bg-transparent p-1"
                        />
                        <input
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="#6366f1"
                            className="w-full rounded-xl border bg-default-50 px-4 py-2.5 text-sm outline-none focus:border-primary font-mono"
                        />
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-3 rounded-xl border p-4 bg-default-50">
                <span className="text-sm font-medium text-default-500">Preview:</span>
                <div
                    className="flex items-center gap-2 rounded-full px-4 py-1.5 text-white text-sm font-semibold"
                    style={{ backgroundColor: color }}
                >
                    <span>{icon}</span>
                    <span>{name || "Category Name"}</span>
                </div>
            </div>

            <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={onCancel} isDisabled={loading}>
                    <X size={16} />
                    Cancel
                </Button>
                <Button
                    onClick={() => onSave({ name, description, icon, color })}
                    isDisabled={loading || !name.trim()}
                    className="bg-primary text-white"
                >
                    <Check size={16} />
                    {loading ? "Saving..." : "Save Category"}
                </Button>
            </div>
        </div>
    );
}

export default function AdminCategoriesPage() {
    const token = useAdminToken();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const API = process.env.NEXT_PUBLIC_SERVER_URL;

    const fetchCategories = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API}/admin/categories`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setCategories(data.data);
        } catch {
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchCategories();
    }, [token]);

    const createCategory = async (data: Partial<Category>) => {
        if (!token) return;
        setFormLoading(true);
        try {
            const res = await fetch(`${API}/admin/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Category created!");
                setShowForm(false);
                fetchCategories();
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Failed to create category");
        } finally {
            setFormLoading(false);
        }
    };

    const updateCategory = async (id: string, data: Partial<Category>) => {
        if (!token) return;
        setFormLoading(true);
        try {
            const res = await fetch(`${API}/admin/categories/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Category updated!");
                setEditingCategory(null);
                fetchCategories();
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Failed to update category");
        } finally {
            setFormLoading(false);
        }
    };

    const deleteCategory = async (id: string, name: string) => {
        if (!confirm(`Delete category "${name}"?`)) return;
        if (!token) return;
        try {
            const res = await fetch(`${API}/admin/categories/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Category deleted");
                fetchCategories();
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to delete category");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FolderKanban size={28} className="text-emerald-500" />
                        Categories
                    </h1>
                    <p className="mt-1 text-default-500">
                        {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
                    </p>
                </div>

                {!showForm && !editingCategory && (
                    <Button
                        className="bg-emerald-500 text-white"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus size={18} />
                        New Category
                    </Button>
                )}
            </div>

            {/* Create Form */}
            {showForm && (
                <CategoryForm
                    onSave={createCategory}
                    onCancel={() => setShowForm(false)}
                    loading={formLoading}
                />
            )}

            {/* Edit Form */}
            {editingCategory && (
                <CategoryForm
                    initial={editingCategory}
                    onSave={(data) => updateCategory(editingCategory._id, data)}
                    onCancel={() => setEditingCategory(null)}
                    loading={formLoading}
                />
            )}

            {/* Category Grid */}
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 rounded-2xl bg-default-100 animate-pulse" />
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-background py-20 text-default-400">
                    <FolderKanban size={48} className="mb-4 opacity-30" />
                    <p className="text-lg font-medium">No categories yet</p>
                    <p className="text-sm mt-1">Create your first category above</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="group rounded-2xl border bg-background p-5 shadow-sm hover:shadow-md transition"
                        >
                            {/* Color stripe */}
                            <div
                                className="h-1 rounded-full mb-4"
                                style={{ backgroundColor: cat.color }}
                            />

                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
                                        style={{ backgroundColor: cat.color + "20" }}
                                    >
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{cat.name}</h3>
                                        {cat.description && (
                                            <p className="text-xs text-default-400 mt-0.5 line-clamp-2">
                                                {cat.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => setEditingCategory(cat)}
                                        className="rounded-lg p-1.5 hover:bg-default-100 text-default-400 hover:text-default-700"
                                    >
                                        <Edit2 size={15} />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(cat._id, cat.name)}
                                        className="rounded-lg p-1.5 hover:bg-danger/10 text-default-400 hover:text-danger"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-default-400">
                                Created {new Date(cat.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
