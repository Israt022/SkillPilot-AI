"use client";

import { useMemo, useState } from "react";

import ExploreHeader from "./ExploreHeader";
import ExploreFilters from "./ExploreFilters";
import ResourceGrid from "./ResourceGrid";
import Pagination from "./Pagination";

export default function ExploreResources({
    resources,
}: {
    resources: any[]
}) {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [level, setLevel] = useState("All");

    const [page, setPage] = useState(1);

    const perPage = 6;

    const filtered = useMemo(() => {

        return resources.filter((item) => {

            const searchMatch =

                item.title.toLowerCase().includes(search.toLowerCase()) ||

                item.shortDescription.toLowerCase().includes(search.toLowerCase());

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

            />

            <ResourceGrid
                resources={current}
            />

            <Pagination

                page={page}

                totalPages={totalPages}

                setPage={setPage}

            />

        </div>

    )

}