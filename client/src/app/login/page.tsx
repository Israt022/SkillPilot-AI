"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {


    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login();
            router.push("/dashboard");
        }, 1200);
    };

    const handleDemoLogin = () => {
        setIsDemoLoading(true);
        setTimeout(() => {
            login();
            router.push("/dashboard");
        }, 1000);
    };

    const handleGoogleLogin = async () => {
        // Google OAuth will be wired here
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        // alert("Google login coming soon!");
        console.log(data)
    };

    return (
        <main className="flex flex-1 items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="rounded-2xl border border-default-200 bg-background p-8 shadow-xl">

                    {/* Header */}
                    <div className="mb-8 flex flex-col items-center gap-3 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                            <p className="mt-1 text-sm text-default-500">
                                Sign in to your SkillPilot AI account
                            </p>
                        </div>
                    </div>

                    {/* Demo Login Banner */}
                    <div className="mb-6 rounded-xl border border-warning-200 bg-warning-50 p-4">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-warning-700">
                            <Sparkles size={15} />
                            Try it instantly — no account needed
                        </p>
                        <button
                            onClick={handleDemoLogin}
                            disabled={isDemoLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-warning-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-warning-600 active:scale-[0.98] disabled:opacity-70"
                        >
                            {isDemoLoading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Logging in…
                                </>
                            ) : (
                                <>
                                    <Sparkles size={15} />
                                    Demo Login — Click to see logged-in view
                                </>
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-default-200" />
                        <span className="text-xs text-default-400">or continue with</span>
                        <div className="h-px flex-1 bg-default-200" />
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-default-300 bg-background px-4 py-3 text-sm font-semibold text-default-700 shadow-sm transition-all duration-200 hover:bg-default-50 hover:border-default-400 active:scale-[0.98]"
                    >
                        {/* Google SVG Icon */}
                        <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                            <path d="M47.532 24.552c0-1.636-.132-3.2-.38-4.704H24.48v8.896h12.956c-.56 3.008-2.24 5.556-4.772 7.264v6.04h7.728c4.52-4.164 7.14-10.3 7.14-17.496z" fill="#4285F4" />
                            <path d="M24.48 48c6.48 0 11.92-2.148 15.888-5.832l-7.728-6.04c-2.148 1.44-4.892 2.292-8.16 2.292-6.272 0-11.588-4.232-13.492-9.924H3.04v6.24C6.988 42.856 15.136 48 24.48 48z" fill="#34A853" />
                            <path d="M10.988 28.496A14.476 14.476 0 0 1 10.24 24c0-1.564.272-3.08.748-4.496v-6.24H3.04A23.952 23.952 0 0 0 .48 24c0 3.876.932 7.548 2.56 10.736l7.948-6.24z" fill="#FBBC05" />
                            <path d="M24.48 9.58c3.536 0 6.712 1.216 9.208 3.596l6.9-6.9C36.388 2.4 30.948 0 24.48 0 15.136 0 6.988 5.144 3.04 13.264l7.948 6.24C12.892 13.812 18.208 9.58 24.48 9.58z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-default-200" />
                        <span className="text-xs text-default-400">or sign in with email</span>
                        <div className="h-px flex-1 bg-default-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-default-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-default-300 bg-default-50 py-3 pl-10 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-default-400 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-default-700">
                                    Password
                                </label>
                                <Link href="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400"
                                />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-default-300 bg-default-50 py-3 pl-10 pr-11 text-sm outline-none transition-all duration-200 placeholder:text-default-400 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-default-400 hover:text-default-600"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Signing in…
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-default-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
