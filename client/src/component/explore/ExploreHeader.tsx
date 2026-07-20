export default function ExploreHeader({
    total
}: {
    total: number
}) {

    return (

        <div className="mb-10 text-center">

            <h1 className="text-5xl font-bold">

                Explore Resources

            </h1>

            <p className="mt-4 text-default-500">

                Browse {total}+ learning resources shared by the community.

            </p>

        </div>

    )

}