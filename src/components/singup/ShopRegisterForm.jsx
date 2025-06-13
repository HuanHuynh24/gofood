"use client";
import Image from "next/image";
import React from "react";
import { Upload } from "lucide-react";

export default function ShopRegisterForm({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#fffced9c]  flex items-center justify-center z-10">
      <form className="bg-white rounded-lg p-6 w-full max-w-[600px] shadow-lg relative z-50 max-h-[600px] overflow-y-scroll">
        {/* Thông tin cơ bản */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Thông tin cơ bản
          </h2>

          <div className="space-y-4">
            <Input label="Tên shop" required placeholder="Nhập mã" />

            <div className="space-y-2">
              <Label required>Địa chỉ thường trú:</Label>
              <input
                type="text"
                placeholder="Số nhà, tên đường"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Tỉnh/Thành phố"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Quận/Huyện"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Xã/Phường"
                className="form-input"
              />
            </div>

            <Input label="Email" required type="email" placeholder="Email" />
            <Input
              label="Số điện thoại"
              required
              type="tel"
              placeholder="Số điện thoại"
            />

            <div>
              <Label required>Mã OTP:</Label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Mã OTP"
                  className="form-input flex-1"
                />
                <button
                  type="button"
                  className="border px-4 py-2 rounded hover:bg-gray-100"
                >
                  Gửi mã
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin minh chứng */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Thông tin minh chứng
          </h2>

          <Input label="Số CCCD" required placeholder="" />

          <div className="space-y-3">
            <FileInput label="Ảnh mặt trước CCCD" required />
            <FileInput label="Ảnh mặt sau CCCD" required />
            <FileInput label="Ảnh chân dung" required />
          </div>
        </div>

        {/* Nút tiếp tục */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="border px-6 py-2 rounded hover:bg-gray-100"
          >
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, required, ...props }) {
  return (
    <div>
      <Label required={required}>{label}:</Label>
      <input className="form-input w-full" {...props} />
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {required && <span className="text-red-500 mr-1">*</span>}
      {children}
    </label>
  );
}

function FileInput({ label, required }) {
  return (
    <div>
      <Label required={required}>{label}:</Label>
      <label className="flex items-center justify-center w-12 h-10 border rounded cursor-pointer hover:bg-gray-50">
        <Upload size={20} />
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}
