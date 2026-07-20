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

        <div className="flex h-screen bg-default-50 overflow-hidden">


            <DashboardSidebar
                open={open}
                setOpen={setOpen}
            />


            <div className="flex flex-1 flex-col overflow-hidden">

                <DashboardNavbar
                    setOpen={setOpen}
                />


                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>


            </div>

        </div>

    )
}