"use client";

import { useEffect, useMemo, useState } from "react";

import ExploreHeader from "./ExploreHeader";
import ExploreFilters from "./ExploreFilters";
import ResourceGrid from "./ResourceGrid";
import Pagination from "./Pagination";

export default function ExploreResources({ resources, categories, }: { resources: any[]; categories: any[]; }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All");
    const [page, setPage] = useState(1);
    const perPage = 6;

    useEffect(() => {
        setPage(1);
    }, [search, category, level]);

    const filtered = useMemo(() => {
        return resources.filter((item) => {
            const searchMatch =
                (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
                (item.shortDescription || "")
                    .toLowerCase()
                    .includes(search.toLowerCase());
            const categoryMatch =
                category === "All" ||
                item.category === category;
            const levelMatch =
                level === "All" ||
                item.level === level;
            return searchMatch && categoryMatch && levelMatch;
        });
    }, [resources, search, category, level]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const start = (page - 1) * perPage;
    const current = filtered.slice(start, start + perPage);

    return (

        <div className="mx-auto max-w-7xl px-6 py-12">

            <ExploreHeader total={filtered.length} />

            <ExploreFilters

                search={search}
                setSearch={setSearch}

                category={category}
                setCategory={setCategory}

                level={level}
                setLevel={setLevel}
                categories={categories}

            />

            {filtered.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-default-300 bg-background px-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-2xl">📚</span>
                    </div>

                    <h3 className="text-xl font-semibold">
                        No resources found
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-default-500">
                        We couldn't find any resources matching your search or filters.
                        Try a different keyword or reset your filters.
                    </p>
                </div>
            ) : (
                <>
                    <ResourceGrid resources={current} />

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </>
            )}

        </div>

    )

}