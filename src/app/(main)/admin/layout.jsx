import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({ children }) {
    const menuItems = [
        { label: "Quản lý khách hàng", url: "/admin/khach-hang" },
        { label: "Quản lý người giao hàng", url: "/admin/nguoi-giao" },
        { label: "Quản lý người bán hàng", url: "/admin/nguoi-ban" },
        { label: "Quản lý hóa đơn", url: "/admin/hoa-don" },
    ];

    return (
        <>
            <div className="flex gap-[30px] bg-secondary min-h-screen">
                <Sidebar menuItems={menuItems} className={"w-2/12"} />
                <main className="p-4 px-0 w-10/12">{children}</main>
            </div>
        </>
    );
}