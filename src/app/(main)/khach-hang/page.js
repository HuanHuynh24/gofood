import FoodCard from "@/components/FoodCard/FoodCard";
import Sidebar from "@/components/Sidebar/Sidebar";

import React from "react";
import foodData from "@/data/foodData";
import FilterSearchBar from "@/components/FilterSearchBar/FilterSearchBar";
export default function Home() {
  const menuItems = [
    { label: "Đơn hàng", url: "/giao-hang" },
    { label: "Xem thông tin đơn hàng", url: "/khach-hang/chi-tiet-don-hang" },
    { label: "Cài đặt", url: "/giao-hang/cai-dat" },
    { label: "Đăng xuất", url: "/logout" },
  ];

  return (
    <div className="flex gap-[30px]">
      <Sidebar menuItems={menuItems} />
      <main className="pr-[30px]">
        <FilterSearchBar />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
          {foodData.map((item, index) => (
            <FoodCard
              key={index}
              store={item.store}
              name={item.name}
              address={item.address}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
