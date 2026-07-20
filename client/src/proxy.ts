import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const pathname = request.nextUrl.pathname;

    // Dashboard এবং Explore Details protect
    const isProtected =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/explore/") ||
        pathname.startsWith("/ai-workspace") ||
        pathname.startsWith("/contact");

    if (isProtected && !session) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
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