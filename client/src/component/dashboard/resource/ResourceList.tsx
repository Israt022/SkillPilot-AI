"use client";

import { useEffect, useState } from "react";
import ResourceItem from "./ResourceItem";

export default function ResourceList({
    user
}: {
    user: any
}) {
    const [resources, setResources] = useState<any[]>([]);
    useEffect(() => {
        const fetchResources = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/resources/${user.id}`
            );
            const data = await res.json();
            setResources(data.data);
        };
        fetchResources();
    }, [user.id]);

    return (

        <div className="space-y-4">


            {
                resources.length > 0 ? (

                    resources.map(resource => (

                        <ResourceItem
                            key={resource._id}
                            resource={resource}
                        />

                    ))

                ) : (

                    <p className="text-default-500">
                        No resources found
                    </p>

                )
            }


        </div>

    );
}