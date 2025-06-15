'use client';
import { useRouter } from "next/navigation";

export default function OrderCard({ orderId, shopAddress, deliveryAddress, total }) {
  const router = useRouter();

  const handleAccept = () => {
    router.push(`/giao-hang/${orderId}`);
  };

  return (
    <div className="flex bg-[#fdfaf4] border p-4 rounded gap-4 items-center justify-between max-w-2xl">
      <div>
        <p><strong>Đơn hàng #{orderId}</strong></p>
        <p>Địa chỉ quán: {shopAddress}</p>
        <p>Nơi nhận: {deliveryAddress}</p>
        <p><strong>Tổng tiền: {total}Đ</strong></p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={handleAccept}
        >
          Nhận đơn
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded">Không nhận</button>
      </div>
    </div>
  );
}
