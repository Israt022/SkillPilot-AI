"use client";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";


const DeleteResourceModal = ({
    resource,
    open,
    setOpen
}: {
    resource: any;
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {


    const handleDelete = async () => {

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/resources/${resource._id}`,
                {
                    method: "DELETE"
                }
            );


            const data = await res.json();


            if (res.ok) {

                toast.success("Resource deleted");

                setOpen(false);

                window.location.reload();

            } else {

                toast.error(data.message);

            }


        } catch (error) {

            console.log(error);
            toast.error("Delete failed");

        }

    }



    if (!open) return null;


    return (
        <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40
            backdrop-blur-md
            p-4
        ">

            <div className="
                w-full max-w-xl
                max-h-[85vh]
                overflow-y-auto
                rounded-3xl
                bg-background
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                border
                border-default-200
            ">

                <h2 className="text-xl font-bold">
                    Delete Resource?
                </h2>


                <p className="mt-3">
                    Are you sure you want to delete {resource.title}?
                </p>


                <div className="mt-5 flex gap-3">

                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>


                    <Button
                        className={'bg-black border'}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                </div>

            </div>

        </div>
    );
};


export default DeleteResourceModal;