"use client";

import { useEffect, useState } from "react";
import { useAdminToken } from "@/lib/useAdminToken";
import { Users, Shield, ShieldOff, Trash2, Search } from "lucide-react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    image?: string;
}

export default function AdminUsersPage() {
    const token = useAdminToken();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const API = process.env.NEXT_PUBLIC_SERVER_URL;

    const fetchUsers = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setUsers(data.data);
        } catch (err) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchUsers();
    }, [token]);

    const updateRole = async (userId: string, role: "admin" | "user") => {
        if (!token) return;
        setActionLoading(userId + role);
        try {
            const res = await fetch(`${API}/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(`User ${role === "admin" ? "promoted to Admin" : "demoted to User"}`);
                fetchUsers();
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to update role");
        } finally {
            setActionLoading(null);
        }
    };

    const deleteUser = async (userId: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
        if (!token) return;
        setActionLoading(userId + "delete");
        try {
            const res = await fetch(`${API}/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                toast.success("User deleted");
                fetchUsers();
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to delete user");
        } finally {
            setActionLoading(null);
        }
    };

    const filtered = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Users size={28} className="text-blue-500" />
                        Users
                    </h1>
                    <p className="mt-1 text-default-500">
                        {users.length} total user{users.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border bg-background overflow-hidden">
                {loading ? (
                    <div className="space-y-px">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-16 bg-default-50 animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-default-400">
                        <Users size={40} className="mb-3 opacity-40" />
                        <p>No users found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-default-50 text-left text-xs font-semibold uppercase tracking-wide text-default-400">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filtered.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-default-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold text-sm shrink-0">
                                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                                </div>
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-default-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                    user.role === "admin"
                                                        ? "bg-danger/10 text-danger"
                                                        : "bg-default-100 text-default-500"
                                                }`}
                                            >
                                                {user.role === "admin" ? (
                                                    <Shield size={11} />
                                                ) : null}
                                                {user.role || "user"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-default-400">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {user.role === "admin" ? (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        isDisabled={!!actionLoading}
                                                        onClick={() => updateRole(user._id, "user")}
                                                    >
                                                        <ShieldOff size={14} />
                                                        Demote
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        isDisabled={!!actionLoading}
                                                        onClick={() => updateRole(user._id, "admin")}
                                                    >
                                                        <Shield size={14} />
                                                        Promote
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    isDisabled={!!actionLoading}
                                                    onClick={() => deleteUser(user._id, user.name)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
