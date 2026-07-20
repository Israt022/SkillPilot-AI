"use client";

import { Button } from "@heroui/react";
import { ExternalLink } from "lucide-react";

const ResourceViewModal = ({
    resource,
    open,
    setOpen
}: {
    resource: any;
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {

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


                {/* Image */}

                <img
                    src={resource.image}
                    alt={resource.title}
                    className="
                        h-52
                        w-full
                        rounded-2xl
                        object-cover
                    "
                />



                {/* Title */}

                <h2 className="
                    mt-5
                    text-3xl
                    font-bold
                ">
                    {resource.title}
                </h2>



                {/* Meta */}

                <div className="
                    mt-4
                    flex
                    flex-wrap
                    gap-3
                ">

                    <span className="
                        rounded-full
                        bg-primary/10
                        px-4
                        py-1
                        text-sm
                        text-primary
                    ">
                        {resource.category}
                    </span>


                    <span className="
                        rounded-full
                        bg-default-100
                        px-4
                        py-1
                        text-sm
                    ">
                        {resource.type}
                    </span>


                    <span className="
                        rounded-full
                        bg-default-100
                        px-4
                        py-1
                        text-sm
                    ">
                        {resource.level}
                    </span>

                </div>




                {/* Short Description */}

                <div className="mt-6">

                    <h3 className="font-semibold text-lg">
                        Short Description
                    </h3>

                    <p className="mt-2 text-default-500">
                        {resource.shortDescription}
                    </p>

                </div>




                {/* Full Description */}

                <div className="mt-5">

                    <h3 className="font-semibold text-lg">
                        Description
                    </h3>

                    <p className="
                        mt-2
                        text-default-500
                        leading-relaxed
                    ">
                        {resource.description}
                    </p>

                </div>




                {/* Tags */}

                {
                    resource.tags?.length > 0 && (

                        <div className="mt-5">

                            <h3 className="font-semibold text-lg mb-2">
                                Skills / Tags
                            </h3>


                            <div className="flex flex-wrap gap-2">

                                {
                                    resource.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="
                                                rounded-full
                                                bg-primary/10
                                                px-3
                                                py-1
                                                text-sm
                                                text-primary
                                            "
                                        >
                                            {tag}
                                        </span>
                                    ))
                                }

                            </div>

                        </div>

                    )
                }




                {/* URL */}

                {
                    resource.url && (

                        <div className="mt-6">

                            <a
                                href={resource.url}
                                target="_blank"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-primary
                                    font-semibold
                                    hover:underline
                                "
                            >

                                Visit Resource
                                <ExternalLink size={16} />

                            </a>

                        </div>

                    )
                }





                {/* Created */}

                <p className="
                    mt-5
                    text-sm
                    text-default-400
                ">
                    Created:
                    {" "}
                    {
                        new Date(resource.createdAt)
                            .toLocaleDateString()
                    }
                </p>




                {/* Button */}

                <div className="
                    mt-6
                    flex
                    justify-end
                ">

                    <Button
                        className="
                            bg-black border
                            text-default-800
                            hover:bg-default-300
                        "
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>

                </div>


            </div>

        </div>
    );
};


export default ResourceViewModal;