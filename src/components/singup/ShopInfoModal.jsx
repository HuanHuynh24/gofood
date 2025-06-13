"use client";
import React, { useState } from 'react';

export default function ShopInfoModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Thông tin shop, 2: Thông tin người đại diện

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-secondary   flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <div className=" w-3/12 flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${step === 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className={`${step === 1 ? 'text-black font-semibold' : 'text-gray-500'}`}>
              Thông tin shop
            </span>
          </div>
          <div className="border-t w-5/12 mr-12 mx-2" />
          <div className=" w-4/12 flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${step === 2 ? 'bg-orange-500' : 'bg-gray-300'}`} />
            <span className={`${step === 2 ? 'text-black font-semibold' : 'text-gray-500'}`}>
              Thông tin người đại diện
            </span>
          </div>
        </div>

        {step === 1 && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            {/* Form Thông tin shop */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Tên shop:
              </label>
              <input type="text" placeholder="Tên shop" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Địa chỉ:
              </label>
              <input type="text" placeholder="Địa chỉ" className="w-full border rounded px-3 py-2 mb-2" />
              <input type="text" placeholder="Tỉnh/Thành phố" className="w-full border rounded px-3 py-2 mb-2" />
              <input type="text" placeholder="Quận/Huyện" className="w-full border rounded px-3 py-2 mb-2" />
              <input type="text" placeholder="Xã/Phường" className="w-full border rounded px-3 py-2" />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Email:
                </label>
                <input type="email" className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> SĐT:
                </label>
                <input type="tel" className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Mã OTP:
              </label>
              <div className="flex space-x-2">
                <input type="text" className="flex-1 border rounded px-3 py-2" />
                <button type="button" className="border px-4 py-2 rounded hover:bg-gray-100">Gửi mã</button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button type="button" onClick={onClose} className="border rounded px-6 py-2 text-gray-600 hover:bg-gray-100">
                Hủy
              </button>
              <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                Tiếp tục
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Form Thông tin người đại diện */}
            <div className="grid grid-cols-1 gap-4">
              <Input label="Tên đầy đủ người đại diện" required />
              <Input label="Email" required />
              <Input label="SĐT" required />
              <Input label="Số CCCD" required />
              <Input label="Ngày cấp" required />
              <Input label="Nơi cấp" required />
              <Input label="Giấy phép kinh doanh" required />
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setStep(1)} className="border rounded px-6 py-2 text-gray-600 hover:bg-gray-100">
                Quay lại
              </button>
              <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                Tiếp tục
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Input({ label, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {required && <span className="text-red-500">*</span>} {label}:
      </label>
      <input type="text" className="w-full border rounded px-3 py-2" />
    </div>
  );
}
