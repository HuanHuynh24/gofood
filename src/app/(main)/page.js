import FoodCard from "@/components/FoodCard/FoodCard";
import Sidebar from "@/components/Sidebar/Sidebar";

import React from "react";
import foodData from "@/data/foodData";
import FilterSearchBar from "@/components/FilterSearchBar/FilterSearchBar";
export default function Home() {
  

  return (
    <div className="flex gap-[30px]">
      <Sidebar />
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
