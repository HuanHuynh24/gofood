"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const fakeOrders = [
  {
    id: "ORD123457",
    date: "2025-06-09",
    status: "Đang giao",
    total: 450000,
    address: "456 Nguyễn Trãi, Quận 5, TP.HCM",
  },
  {
    id: "ORD123456",
    date: "2025-06-10",
    status: "Đã giao",
    total: 320000,
    address: "123 Lê Lợi, Quận 1, TP.HCM",
  },
  {
    id: "ORD123458",
    date: "2025-06-05",
    status: "Đã hủy",
    total: 150000,
    address: "789 Trần Hưng Đạo, Quận 3, TP.HCM",
  },
];
const menuItems = [
  { label: "Đơn hàng", url: "/giao-hang" },
  { label: "Xem lịch sử giao hàng", url: "/giao-hang/lich-su-giao-hang" },
  { label: "Cài đặt", url: "/giao-hang/cai-dat" },
  { label: "Đăng xuất", url: "/logout" },
];
export default function LichSuGiaoHang() {
  return (
    <div className="flex gap-[30px] bg-white min-h-screen">
      <Sidebar menuItems={menuItems} className={"w-2/12"}></Sidebar>
      <div className="max-w-4xl mx-auto p-6 w-10/12">
        <h1 className="text-2xl font-bold mb-4">Lịch sử giao hàng</h1>
        <div className="space-y-4">
          {fakeOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow hover:bg-gray-50 transition"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Mã đơn: {order.id}</p>
                  <p>Ngày đặt: {order.date}</p>
                  <p>
                    Trạng thái:{" "}
                    <span
                      className={`font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {order.total.toLocaleString()}₫
                  </p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Đã giao":
      return "text-green-600";
    case "Đang giao":
      return "text-yellow-600";
    case "Đã hủy":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}
