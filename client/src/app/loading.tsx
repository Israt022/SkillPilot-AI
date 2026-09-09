export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center">

                {/* Logo */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                    <div className="absolute inset-0 animate-ping rounded-3xl bg-primary/10" />

                    {/* Animated Logo Loader */}
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        {/* Spinning ring */}
                        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

                        {/* S inside */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                            <span className="text-2xl font-bold">S</span>
                        </div>
                    </div>
                </div>

                {/* Brand */}
                <h2 className="mt-5 text-xl font-bold">
                    SkillPilot AI
                </h2>

                <p className="mt-1 text-sm text-default-500">
                    Your AI learning copilot
                </p>

                {/* Spinner */}
                <div className="mt-6 flex items-center gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>

            </div>
        </div>
    );
}