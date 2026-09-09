import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const pathname = request.nextUrl.pathname;

    // ── Protect admin routes ──
    if (pathname.startsWith("/dashboard/admin")) {
        // Must be logged in
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // Must have admin role
        if ((session.user as any).role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard/user", request.url));
        }
        return NextResponse.next();
    }

    // ── Protect user dashboard routes ──
    if (pathname.startsWith("/dashboard/user")) {
        // Must be logged in
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // Must have user role
        if ((session.user as any).role !== "user") {
            return NextResponse.redirect(new URL("/dashboard/admin", request.url));
        }
        return NextResponse.next();
    }

    // ── Protect base dashboard & other private routes ──
    const isUserProtected =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/explore/") ||
        pathname.startsWith("/ai-workspace") ||
        pathname.startsWith("/contact");

    if (isUserProtected && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/explore/:path*",
        "/ai-workspace",
        "/contact",
    ],
};