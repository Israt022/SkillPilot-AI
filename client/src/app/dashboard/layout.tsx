import DashboardWrapper from "@/component/dashboard/DashboardWrapper";


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {


    return (

        <DashboardWrapper>
            {children}
        </DashboardWrapper>

    )

}