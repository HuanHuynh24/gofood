'use client';

import { useState, useEffect } from 'react';

export default function PromotionForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    tenKhuyenmai: '',
    giatriKhuyenmai: '',
    ngayBatDau: '',
    ngayKetThuc: '',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? 'Sửa' : 'Thêm'} khuyến mãi
        </h2>

        <input
          name="tenKhuyenmai"
          value={form.tenKhuyenmai}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tên khuyến mãi"
          required
        />
        <input
          name="giatriKhuyenmai"
          value={form.giatriKhuyenmai}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Giá trị (%)"
          type="number"
          required
        />
        <input
          name="ngayBatDau"
          value={form.ngayBatDau}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          required
        />
        <input
          name="ngayKetThuc"
          value={form.ngayKetThuc}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
