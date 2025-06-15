"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OrderProgress from "@/components/Progress/DeliveryTracking";
import RatingDelivery from "@/components/Khachhang/RatingDelivery";

export default function OrderDetailPage() {
  const [orderData, setOrderData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const data = Cookies.get("latestOrder");
    if (data) {
      const parsed = JSON.parse(data);
      setOrderData(parsed);
      setCurrentStep(4); // hoặc logic khác tùy theo trạng thái
    }
  }, []);

  const isCompleted = currentStep === 4;

  if (!orderData) {
    return <p className="text-center mt-10">Không tìm thấy thông tin đơn hàng.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <OrderProgress currentStep={currentStep} order={orderData} />
      <RatingDelivery />
    </div>
  );
}
