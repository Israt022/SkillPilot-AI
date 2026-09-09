import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

export default async function DashboardRedirectPage() {
    const user = await getUserSession();

    if (!user) {
        redirect("/login");
    }

    if ((user as any).role === "admin") {
        redirect("/dashboard/admin");
    }

    redirect("/dashboard/user");
}