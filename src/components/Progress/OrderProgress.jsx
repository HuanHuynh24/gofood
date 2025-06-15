"use client";
import React, { useState } from "react";

export default function OrderProgress({ order }) {
  const [step, setStep] = useState(0);

  const steps = [
    "Quán đang chuẩn bị",
    "Đã tới quán",
    "Đã nhận đơn hàng",
    "Hoàn thành",
  ];

  const handleNextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <div className="mx-auto p-6 bg-[#fdfbf5] rounded shadow">
      <div className="space-y-2 mb-6">
        <p className="font-semibold italic">
          Thông tin đơn hàng <strong>#{order.id}</strong>
        </p>
        <p className="italic">Địa chỉ giao hàng: {order.address}</p>
        <p className="italic">Tên quán: {order.shopName}</p>
        <p className="italic">Tổng tiền: {order.total}</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-2">
        {steps.map((label, index) => (
          <div key={index} className="flex-1 flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  index <= step ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-300"
                }`}
              />
              <p className="text-xs text-center mt-2 w-24">{label}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>

      {step < steps.length - 1 && (
        <div className="text-center mt-6">
          <button
            onClick={handleNextStep}
            className="bg-[#fdf3da] hover:bg-[#f7e8c4] px-6 py-2 rounded shadow text-sm font-semibold"
          >
            {step === 0 ? "Xác nhận đã tới quán" : "Tiếp tục"}
          </button>
        </div>
      )}
    </div>
  );
}
