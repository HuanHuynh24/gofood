// app/giao-hang/[orderId]/page.jsx
"use client";

import OrderProgress from "@/components/Progress/OrderProgress";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function OrderDetailPage({ params }) {
  const orderId = params.orderId;

  // Bạn có thể fetch dữ liệu từ API thật ở đây bằng orderId
  const fakeData = {
    id: orderId,
    address: "Hà Huy Tập, Thanh Khê, Đà Nẵng",
    shopName: "Gà ốm",
    total: "139.000Đ",
  };

  const menuItems = [
    { label: "Đơn hàng", url: "/giao-hang" },
    { label: "Xem lịch sử giao hàng", url: "/giao-hang/lich-su-giao-hang" },
    { label: "Cài đặt", url: "/giao-hang/cai-dat" },
    { label: "Đăng xuất", url: "/logout" },
  ];
  return (
    <div className="flex gap-[30px] bg-white min-h-screen">
      <Sidebar menuItems={menuItems} className={"w-2/12"}></Sidebar>
      <main className="min-h-screen bg-white p-6 w-10/12">
        <OrderProgress order={fakeData} />
      </main>
    </div>
  );
}
