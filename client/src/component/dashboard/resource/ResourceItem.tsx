"use client";

import {
    Eye,
    Edit,
    Trash2
} from "lucide-react";
import { Button } from "@heroui/react";
import { useState } from "react";
import ResourceViewModal from "./ResourceViewModal";
import ResourceEditModal from "./ResourceEditModal";
import DeleteResourceModal from "./DeleteResourceModal";


const ResourceItem = ({ resource }: { resource: any }) => {

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleOpen = (type: string) => {
        setModalType(type);
        setOpen(true);
    };


    return (
        <>
            <div className="
                flex items-center justify-between
                rounded-2xl
                border border-default-200
                bg-background
                p-4
                shadow-sm
            ">

                <div className="flex items-center gap-5">

                    <img
                        src={resource.image}
                        alt={resource.title}
                        className="h-20 w-28 rounded-xl object-cover"
                    />

                    <div>
                        <h2 className="font-semibold text-lg">
                            {resource.title}
                        </h2>

                        <div className="mt-2 text-sm text-default-500">
                            {resource.category} • {resource.type} • {resource.level}
                        </div>
                    </div>

                </div>


                <div className="flex gap-2">

                    <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewOpen(true)}
                    >
                        <Eye size={18} />
                    </Button>


                    <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditOpen(true)}
                    >
                        <Edit size={18} />
                    </Button>


                    <Button
                        isIconOnly
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <Trash2 size={18} />
                    </Button>

                </div>
                <ResourceViewModal
                    resource={resource}
                    open={viewOpen}
                    setOpen={setViewOpen}
                />


                <ResourceEditModal
                    resource={resource}
                    open={editOpen}
                    setOpen={setEditOpen}
                />


                <DeleteResourceModal
                    resource={resource}
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                />
            </div>
        </>
    );
};


export default ResourceItem;