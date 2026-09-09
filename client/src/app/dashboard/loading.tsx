export default function DashboardLoading() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center">

                {/* Loader */}
                <div className="relative flex h-20 w-20 items-center justify-center">

                    {/* Spinning Ring */}
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

                    {/* Logo */}
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