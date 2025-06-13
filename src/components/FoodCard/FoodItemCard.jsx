"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // <-- import

export default function FoodItemCard({ name, price, imageUrl }) {
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("m");
  const { cart, setCart } = useCart(); // <-- sử dụng context

  const sizes = ["m", "l", "xl"];

  const updateCartInLocalStorage = (newQuantity) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex(
      (item) => item.name === name && item.size === selectedSize
    );

    if (newQuantity > 0) {
      const updatedItem = {
        name,
        price,
        imageUrl,
        quantity: newQuantity,
        size: selectedSize,
      };

      if (itemIndex > -1) {
        existingCart[itemIndex] = updatedItem;
      } else {
        existingCart.push(updatedItem);
      }
    } else if (itemIndex > -1) {
      existingCart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart); // <-- cập nhật context
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = existingCart.find(
      (item) => item.name === name && item.size === size
    );
    setQuantity(item ? item.quantity : 0);
  };

  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateCartInLocalStorage(newQty);
  };

  const decreaseQty = () => {
    const newQty = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQty);
    updateCartInLocalStorage(newQty);
  };

  // Khôi phục số lượng từ localStorage khi render lại
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = stored.find(
      (item) => item.name === name && item.size === selectedSize
    );
    if (item) setQuantity(item.quantity);
  }, [selectedSize]);

  return (
    <div className="bg-[#f9f6ec] p-4 rounded shadow flex items-center gap-4 max-w-xl">
      <Image
        src={imageUrl}
        alt={name}
        width={120}
        height={120}
        className="rounded object-cover"
      />
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-gray-800">{price.toLocaleString()}Đ</p>

        <div className="flex items-center gap-2 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`w-7 h-7 px-2 py-1 text-sm rounded-full border ${
                selectedSize === size
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={increaseQty}
          className="w-8 h-8 rounded-full bg-gray-200 text-xl"
        >
          +
        </button>
        <span>{quantity}</span>
        <button
          onClick={decreaseQty}
          className="w-8 h-8 rounded-full bg-gray-200 text-xl"
        >
          -
        </button>
      </div>
    </div>
  );
}
