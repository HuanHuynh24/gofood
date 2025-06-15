// components/FoodCard.tsx
import Image from "next/image";
import Link from "next/link";
import { toSlug } from "@/lib/slugify";

export default function FoodCard({ name, price, address, store, imageUrl }) {
  return (
    <div className="h-[320px] bg-[#fdfbf5] rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-40 relative">
        <Image
          src={imageUrl} // Đảm bảo bạn có ảnh này trong thư mục public/images
          alt="Đùi gà rán"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800">{name}</h3>
        <p className="text-base font-medium mb-3 text-gray-800">{store}</p>
        <p className="text-sm text-gray-500">{address}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-gray-800">{price}Đ</span>
          <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100">
            <Link href={`/khach-hang/${toSlug(store)}`}>Đặt đơn</Link>
          </button>
        </div>
      </div>
    </div>
  );
}