"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Menu, X, Bot, User, LogOut } from "lucide-react";

import { Button } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { authClient, useSession } from "@/lib/auth-client";

const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
];

const privateLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "AI Workspace", href: "/ai-workspace" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
    const { data: session, isPending } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = session ? privateLinks : publicLinks;

    const handleSignOut = async () => {
        await authClient.signOut();
    };
    if (pathName.includes('dashboard')) {
        return null;
    }


    return (
        <nav className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg">
            <header className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <Bot size={22} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">SkillPilot</h1>
                        <p className="-mt-1 text-xs text-default-500">AI</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`transition-all duration-300 hover:text-primary ${pathName === link.href
                                    ? "font-semibold text-primary"
                                    : "text-default-600"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side */}
                <div className="hidden items-center gap-3 md:flex">
                    {session ? (
                        <>
                            <Link href="/dashboard/profile" className="inline-block">
                                <Button variant="outline" size="sm">
                                    <span className="flex items-center gap-2">
                                        <User size={16} />
                                        Profile
                                    </span>
                                </Button>
                            </Link>

                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleSignOut}
                            >
                                <span className="flex items-center gap-2">
                                    <LogOut size={16} />
                                    Logout
                                </span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button variant="primary" size="sm">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

            </header>

            {/* Mobile Drawer */}
            {isMenuOpen && (
                <div className="border-t border-default-200 bg-background md:hidden">
                    <div className="container mx-auto flex flex-col px-4 py-5">
                        <ul className="space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block rounded-lg px-3 py-2.5 font-medium transition-all duration-200 ${pathName === link.href
                                            ? "bg-primary text-white"
                                            : "text-default-700 hover:bg-default-100"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="my-4 border-t border-default-200" />

                        {session ? (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/dashboard/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button variant="outline" fullWidth>
                                        <span className="flex items-center gap-2">
                                            <User size={16} />
                                            Profile
                                        </span>
                                    </Button>
                                </Link>

                                <Button
                                    variant="danger"
                                    fullWidth
                                    onClick={handleSignOut}
                                >
                                    <span className="flex items-center gap-2">
                                        <LogOut size={16} />
                                        Logout
                                    </span>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button variant="outline" fullWidth>
                                        Login
                                    </Button>
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button variant="primary" fullWidth>
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
