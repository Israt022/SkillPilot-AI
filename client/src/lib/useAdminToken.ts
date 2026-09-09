"use client";

import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";

/**
 * Returns the Better Auth session token for use in Authorization headers
 * when calling the Express admin API.
 */
export function useAdminToken() {
    const { data: session } = useSession();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                // 1. Try authClient getSession
                const sessionRes = await authClient.getSession();
                const sessionToken = (sessionRes?.data as any)?.session?.token || (sessionRes?.data as any)?.token;
                if (sessionToken) {
                    setToken(sessionToken);
                    return;
                }

                // 2. Try fetching from internal auth API
                const res = await fetch("/api/auth/get-session", { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    if (data?.session?.token) {
                        setToken(data.session.token);
                        return;
                    }
                }
            } catch (err) {
                console.error("Failed to retrieve admin token:", err);
            }
        };

        fetchToken();
    }, [session]);

    return token;
}
