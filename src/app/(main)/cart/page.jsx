"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  return (
    <div className="flex gap-[30px]">
      <Sidebar className={"w-2/12"} />
      <main className="p-4 w-10/12">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b pb-2"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>Kích cỡ: {item.size}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>{(item.price * item.quantity).toLocaleString()}Đ</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <button className="w-64 mt-5 bg-[#f4e6c4] py-2 rounded font-semibold hover:opacity-90 hover:cursor-pointer">Đặt đơn</button>
        </div>
      </main>
    </div>
  );
}
