export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <div className="rounded-3xl bg-primary p-8 text-white">

        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-2 opacity-80">
          Continue your AI-powered learning journey.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border p-6">
          <h3 className="text-4xl font-bold">28</h3>
          <p className="text-default-500">
            Resources
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-4xl font-bold">7</h3>
          <p className="text-default-500">
            Saved
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-4xl font-bold">92%</h3>
          <p className="text-default-500">
            Profile
          </p>
        </div>

      </div>

    </div>
  );
}