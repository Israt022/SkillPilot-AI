import ExploreCard from "./ExploreCard";

export default function ResourceGrid({
    resources
}: {
    resources: any[]
}) {

    return (

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">

            {

                resources.map((resource) => (

                    <ExploreCard

                        key={resource._id}

                        resource={resource}

                    />

                ))

            }

        </div>

    )

}