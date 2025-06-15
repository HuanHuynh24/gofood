import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({ children }) {
  const menuItems = [
    { label: "Đơn hàng", url: "/ban-hang" },
    { label: "Quản lý mã khuyến mãi", url: "/ban-hang/ma-khuyen-mai" },
    { label: "Quản lý menu", url: "/ban-hang/menu" },
    { label: "Thanh toán phí thường niên", url: "/ban-hang/thanh-toan-phi" },
    { label: "Cài đặt", url: "/ban-hang/cai-dat" },
    { label: "Đăng xuất", url: "/logout" },
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
