"use client";
import React from "react";

const steps = [
  "Đang chờ quán nhận đơn",
  "Đang chờ người giao hàng",
  "Người giao hàng đã tới quán",
  "Đơn hàng đang được giao",
  "Hoàn thành",
];

export default function DeliveryTracking({ currentStep, order }) {
  return (
    <div className="space-y-2">
      <p className="font-semibold">Mã đơn: {order.id}</p>
      <p>Địa chỉ của bạn: {order.address}</p>
      <p>Tên quán: {order.restaurantName || "Đang cập nhật..."}</p>
      <p>Tổng tiền: {order.total.toLocaleString()}Đ</p>

      <div className="flex items-center gap-2 mt-4">
        {steps.map((label, index) => (
          <React.Fragment key={index}>  
            <div
              className={`w-4 h-4 rounded-full ${
                index <= currentStep ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            {index !== steps.length - 1 && <span className="text-gray-400">→</span>}
          </React.Fragment>
        ))}
      </div>

      <p className="text-sm mt-2">{steps[currentStep]}</p>
    </div>
  );
}
