import React from "react";

const steps = [
  "Đang chờ quán nhận đơn",
  "Đang chờ người giao hàng",
  "Người giao hàng đã tới quán",
  "Đơn hàng đang được giao",
  "Hoàn thành",
];

export default function DeliveryTracking({ currentStep }) {
  return (
    <div className="space-y-2">
      <p className="font-semibold">Thông tin đơn hàng #100405kh011</p>
      <p>Địa chỉ của bạn: Hà Huy Tập, Thanh Khê, Đà Nẵng</p>
      <p>Tên quán: Gà ốm</p>
      <p>Tổng tiền: xxxĐ</p>

      <div className="flex items-center gap-2 mt-4">
        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-4 h-4 rounded-full ${
                index === currentStep
                  ? "bg-green-600"
                  : "bg-gray-300"
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
