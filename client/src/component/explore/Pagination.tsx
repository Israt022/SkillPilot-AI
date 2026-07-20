import { Button } from "@heroui/react";

export default function Pagination({

    page,

    totalPages,

    setPage

}: any) {

    return (

        <div className="mt-10 flex justify-center gap-3">

            <Button

                isDisabled={page === 1}

                onClick={() => setPage(page - 1)}

            >

                Previous

            </Button>

            <span className="px-5 py-2">

                {page} / {totalPages}

            </span>

            <Button

                isDisabled={page === totalPages}

                onClick={() => setPage(page + 1)}

            >

                Next

            </Button>

        </div>

    )

}