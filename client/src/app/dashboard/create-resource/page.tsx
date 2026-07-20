import CreateResourceForm from "@/component/dashboard/resource/CreateResourceForm";
import { getUserSession } from "@/lib/core/session";

export default async function CreateResourcePage() {
    const user = await getUserSession();
    return (
        <div>
            <CreateResourceForm user={user} />
        </div>
    );
}