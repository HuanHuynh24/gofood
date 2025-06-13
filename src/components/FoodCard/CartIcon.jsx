"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FaStore } from "react-icons/fa";

export default function CartIcon() {
  const { cart } = useCart();
  const totalItems = cart.length;

  return (
    <Link href="/cart" className="relative inline-block">
      <FaStore size={24} />
      <span className="absolute flex justify-center items-center bg-primary w-4 h-4 rounded-full -top-2 -right-1 text-orange-700 text-sm font-bold z-10">
        {totalItems}
      </span>
    </Link>
  );
}
