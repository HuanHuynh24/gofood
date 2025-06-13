"use client";
import { useEffect } from 'react';

export default function RegisterModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#fffced9c]  flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative z-50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Đăng ký tài khoản</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              <span className="text-red-500">*</span> Tên đăng nhập:
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Tên đăng nhập"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              <span className="text-red-500">*</span> Email:
            </label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              <span className="text-red-500">*</span> Số điện thoại:
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Số điện thoại"
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">
                <span className="text-red-500">*</span> Mã OTP:
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Mã OTP"
              />
            </div>
            <button
              type="button"
              className="mt-6 border px-3 py-2 rounded text-sm hover:bg-gray-100"
            >
              Gửi mã
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
