// components/Sidebar.tsx
import React from "react";

const menuItems = [
  "Danh sách món ăn",
  "Xem thông tin đơn hàng",
  "Xem lịch sử đặt hàng",
  "Cài đặt",
  "Đăng xuất",
];

export default function Sidebar({className}) {
  return (
    <aside className={` bg-[#fdfbf5] border-r border-gray-200 min-h-[700px]  p-4 ${className?className:"w-64"}`}>
      <nav className="flex flex-col space-y-4 sticky top-0 pt-[30px]">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="bg-[#f9f5e9] text-gray-800 px-4 py-3 rounded text-left hover:bg-[#f3eddc] transition hover:cursor-pointer"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
