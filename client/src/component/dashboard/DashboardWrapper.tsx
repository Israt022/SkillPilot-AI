"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";


export default function DashboardWrapper({
    children
}: {
    children: React.ReactNode
}) {

    const [open, setOpen] = useState(false);


    return (

        <div className="flex min-h-screen bg-default-50">


            <DashboardSidebar
                open={open}
                setOpen={setOpen}
            />


            <div className="flex flex-1 flex-col">

                <DashboardNavbar
                    setOpen={setOpen}
                />


                <main className="flex-1 p-6">
                    {children}
                </main>


            </div>

        </div>

    )
}