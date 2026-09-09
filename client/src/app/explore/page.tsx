import ExploreResources from "@/component/explore/ExploreResources";

async function getResources() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/resources`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.data;
}

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.data;
}

export default async function ExplorePage() {
  const resources = await getResources();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-default-50">
      <ExploreResources resources={resources} categories={categories} />
    </div>
  );
}