"use client";

import Link from "next/link";
import { Bot, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";

const footerLinks = {
    Product: [
        { name: "Home", href: "/" },
        { name: "Explore", href: "/explore" },
        { name: "AI Workspace", href: "/ai-workspace" },
        { name: "Dashboard", href: "/dashboard" },
    ],
    Company: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ],
};

export default function Footer() {
    const pathName = usePathname();
    if (pathName.includes('dashboard')) {
        return null;
    }

    return (
        <footer
            className="relative overflow-hidden border-t"
            style={{
                borderColor: "rgba(99,102,241,0.15)",
                background: "rgba(6,182,212,0.02)",
            }}
        >
            {/* Background Glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(99,102,241,0.12), transparent)",
                }}
            />

            <div className="container-custom relative px-4 py-14">

                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="mb-4 flex items-center gap-3"
                        >
                            <div
                                className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#6366f1,#06b6d4)",
                                    boxShadow:
                                        "0 0 25px rgba(99,102,241,0.35)",
                                }}
                            >
                                <Bot size={24} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    SkillPilot
                                </h2>
                                <p
                                    className="text-xs"
                                    style={{
                                        color: "var(--color-muted)",
                                    }}
                                >
                                    AI
                                </p>
                            </div>
                        </Link>

                        <p
                            className="max-w-xs text-sm leading-relaxed"
                            style={{
                                color: "var(--color-muted)",
                            }}
                        >
                            AI-powered learning and career assistant helping
                            users discover skills, build roadmaps, and grow
                            professionally.
                        </p>
                    </div>


                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                                {title}
                            </h3>

                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm transition hover:text-primary"
                                            style={{
                                                color:
                                                    "var(--color-muted)",
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}


                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                            Contact
                        </h3>

                        <div className="space-y-4 text-sm">

                            <div className="flex items-center gap-3">
                                <Mail
                                    size={17}
                                    className="text-primary"
                                />
                                <span
                                    style={{
                                        color:
                                            "var(--color-muted)",
                                    }}
                                >
                                    support@skillpilot.ai
                                </span>
                            </div>


                            <div className="flex items-center gap-3">
                                <MapPin
                                    size={17}
                                    className="text-primary"
                                />
                                <span
                                    style={{
                                        color:
                                            "var(--color-muted)",
                                    }}
                                >
                                    Dhaka, Bangladesh
                                </span>
                            </div>


                            {/* Social */}
                            <div className="flex gap-3 pt-2">

                                <a
                                    href="https://github.com/israt022"
                                    target="_blank"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:border-primary"
                                    aria-label="Github"
                                >
                                    <FaGithub size={17} />
                                </a>

                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:border-primary"
                                    aria-label="Linkedin"
                                >
                                    <FaLinkedin size={17} />
                                </a>

                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:border-primary"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook size={17} />
                                </a>

                            </div>

                        </div>
                    </div>

                </div>


                {/* Bottom */}
                <div
                    className="mt-12 border-t pt-6 text-center text-sm"
                    style={{
                        borderColor:
                            "rgba(99,102,241,0.15)",
                        color:
                            "var(--color-muted)",
                    }}
                >
                    © {new Date().getFullYear()} SkillPilot AI. All rights
                    reserved.
                </div>

            </div>
        </footer>
    );
}