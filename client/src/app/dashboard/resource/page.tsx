import ResourceList from "@/component/dashboard/resource/ResourceList";
import { getUserSession } from "@/lib/core/session";


export default async function MyResources() {
    const user = await getUserSession();

    return (
        <div className="p-8">
            <h1 className="mb-6 text-3xl font-bold">
                My Resources
            </h1>
            <ResourceList
                user={user}
            />
        </div>
    );
}