"use client";

import {
    Button,
    Input,
    Label,
    TextArea
} from "@heroui/react";

import { useState } from "react";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/imageUpload";


const ResourceEditModal = ({
    resource,
    open,
    setOpen
}: {
    resource: any;
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {


    const [title, setTitle] = useState(resource.title);
    const [category, setCategory] = useState(resource.category);
    const [type, setType] = useState(resource.type);
    const [level, setLevel] = useState(resource.level);

    const [shortDescription, setShortDescription] = useState(
        resource.shortDescription
    );

    const [description, setDescription] = useState(
        resource.description
    );

    const [url, setUrl] = useState(resource.url);


    const [tags, setTags] = useState<string[]>(
        resource.tags || []
    );


    const [image, setImage] = useState(resource.image);
    const [imageFile, setImageFile] = useState<File | null>(null);



    const allTags = [
        "React",
        "Next.js",
        "Node.js",
        "AI",
        "Database",
        "Career"
    ];



    const handleUpdate = async () => {


        try {


            let imageUrl = image;


            if (imageFile) {

                const uploaded = await imgUpload(imageFile);

                imageUrl = uploaded.url;

            }



            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/resources/${resource._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        title,
                        category,
                        type,
                        level,
                        shortDescription,
                        description,
                        url,
                        image: imageUrl,
                        tags

                    })
                }
            );



            const data = await res.json();



            if (res.ok) {

                toast.success("Resource updated");

                setOpen(false);

                window.location.reload();

            }
            else {

                toast.error(data.message);

            }



        } catch (error) {

            console.log(error);

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


                <h2 className="
                mb-6
                text-2xl
                font-bold
                ">
                    Edit Resource
                </h2>




                {/* Image */}

                <div className="mb-5">

                    <Label>
                        Resource Image
                    </Label>


                    <div className="
                    mt-2
                    flex
                    items-center
                    gap-4
                    ">


                        <img
                            src={image}
                            className="
                            h-20
                            w-32
                            rounded-xl
                            object-cover
                            "
                        />


                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {

                                const file = e.target.files?.[0];

                                if (file) {

                                    setImageFile(file);

                                    setImage(
                                        URL.createObjectURL(file)
                                    );

                                }

                            }}
                        />


                    </div>

                </div>





                {/* Basic */}

                <div className="
                grid
                gap-4
                md:grid-cols-2
                ">


                    <div>

                        <Label>
                            Title
                        </Label>

                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </div>



                    <div>

                        <Label>
                            URL
                        </Label>

                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />

                    </div>


                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">

                    <div className="flex flex-col gap-2">
                        <Label>
                            Category
                        </Label>

                        <Input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>
                            Type
                        </Label>

                        <Input
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>
                            Level
                        </Label>

                        <Input
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                    </div>

                </div>
                <div className="mt-4">

                    <Label>
                        Short Description
                    </Label>


                    <Input
                        value={shortDescription}
                        onChange={(e) =>
                            setShortDescription(e.target.value)
                        }
                    />

                </div>







                <div className="mt-4">

                    <Label>
                        Description
                    </Label>


                    <TextArea

                        value={description}

                        onChange={(e) =>
                            setDescription(e.target.value)
                        }

                        className="min-h-28"

                    />

                </div>







                {/* Tags */}

                <div className="mt-5">


                    <Label>
                        Skills / Tags
                    </Label>


                    <div className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                    ">


                        {
                            allTags.map(tag => {


                                const active = tags.includes(tag);


                                return (

                                    <button
                                        key={tag}
                                        type="button"

                                        onClick={() => {

                                            setTags(prev =>

                                                active

                                                    ?

                                                    prev.filter(
                                                        t => t !== tag
                                                    )

                                                    :

                                                    [
                                                        ...prev,
                                                        tag
                                                    ]

                                            )

                                        }}

                                        className={`
                                        rounded-full
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        transition

                                        ${active
                                                ?
                                                "bg-primary text-white"
                                                :
                                                "bg-default-100 hover:bg-default-200"
                                            }
                                        `}
                                    >

                                        {tag}

                                    </button>

                                )

                            })
                        }


                    </div>


                </div>







                {/* Buttons */}


                <div className="
                mt-7
                flex
                justify-end
                gap-3
                ">


                    <Button

                        onClick={() => {
                            setOpen(false)
                        }}

                        className="
                        bg-red-500 rounded-full border
                        text-white
                        "
                    >

                        Cancel

                    </Button>





                    <Button

                        onClick={handleUpdate}

                        className="
                        bg-black rounded-full border
                        text-white
                        "
                    >
                        Update Resource
                    </Button>
                </div>
            </div>
        </div>


    )

}


export default ResourceEditModal;