"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardRouteLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (!link) return;

            const href = link.getAttribute("href");

            if (!href || href === pathname) return;

            if (href.startsWith("/dashboard")) {
                setLoading(true);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [pathname]);

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center">

                    {/* Spinner */}
                    <div className="relative flex h-20 w-20 items-center justify-center">
                        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                            <span className="text-xl font-bold">
                                S
                            </span>
                        </div>
                    </div>

                    <h2 className="mt-4 text-lg font-semibold">
                        Loading...
                    </h2>

                    <p className="mt-1 text-sm text-default-500">
                        Please wait a moment
                    </p>

                </div>
            </div>
        );
    }

    return <>{children}</>;
}