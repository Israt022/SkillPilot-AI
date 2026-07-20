'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Registration failed!");
      return;
    }

    toast.success("Account created successfully!");

    router.push("/dashboard");
  };
  const handleGoogleLogin = async () => {
    // Google OAuth will be wired here
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    // alert("Google login coming soon!");
    console.log(data)
  };
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-default-200 bg-background p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Join SkillPilot AI
          </span>

          <h1 className="mt-5 text-3xl font-bold">
            Create Your Account
          </h1>

          <p className="mt-3 text-sm text-default-500">
            Start your personalized AI-powered learning journey today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-default-200" />
          <span className="text-xs text-default-400">
            OR
          </span>
          <div className="h-px flex-1 bg-default-200" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-default-300 py-3 transition hover:bg-default-50"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M47.532 24.552c0-1.636-.132-3.2-.38-4.704H24.48v8.896h12.956c-.56 3.008-2.24 5.556-4.772 7.264v6.04h7.728c4.52-4.164 7.14-10.3 7.14-17.496z" />
            <path fill="#34A853" d="M24.48 48c6.48 0 11.92-2.148 15.888-5.832l-7.728-6.04c-2.148 1.44-4.892 2.292-8.16 2.292-6.272 0-11.588-4.232-13.492-9.924H3.04v6.24C6.988 42.856 15.136 48 24.48 48z" />
            <path fill="#FBBC05" d="M10.988 28.496A14.476 14.476 0 0110.24 24c0-1.564.272-3.08.748-4.496v-6.24H3.04A23.952 23.952 0 00.48 24c0 3.876.932 7.548 2.56 10.736l7.948-6.24z" />
            <path fill="#EA4335" d="M24.48 9.58c3.536 0 6.712 1.216 9.208 3.596l6.9-6.9C36.388 2.4 30.948 0 24.48 0 15.136 0 6.988 5.144 3.04 13.264l7.948 6.24C12.892 13.812 18.208 9.58 24.48 9.58z" />
          </svg>

          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-default-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </a>
        </p>

      </div>
    </main>
  );
}
