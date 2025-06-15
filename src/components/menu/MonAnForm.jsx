"use client";

import { useState, useEffect } from "react";

export default function MonAnForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    tenMonan: "",
    gia: "",
    hinhAnh: "",
    trangThai: true,
    kichThuoc: [{ ten: "", gia: "" }],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        kichThuoc: initialData.kichThuoc?.length
          ? initialData.kichThuoc
          : [{ ten: "", gia: "" }],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...form.kichThuoc];
    updatedSizes[index][field] = value;
    setForm((prev) => ({ ...prev, kichThuoc: updatedSizes }));
  };

  const addSize = () => {
    setForm((prev) => ({
      ...prev,
      kichThuoc: [...prev.kichThuoc, { ten: "", gia: "" }],
    }));
  };

  const removeSize = (index) => {
    const updated = [...form.kichThuoc];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, kichThuoc: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validSizes = form.kichThuoc.filter((k) => k.ten && k.gia);
    const data = {
      ...form,
      gia: parseFloat(form.gia),
      kichThuoc: validSizes.map((k) => ({
        ten: k.ten,
        gia: parseFloat(k.gia),
      })),
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-xl space-y-4 shadow-xl border"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {initialData ? "Cập nhật món ăn" : "Thêm món ăn"}
        </h2>

        <input
          name="tenMonan"
          placeholder="Tên món ăn"
          value={form.tenMonan}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="gia"
          placeholder="Giá gốc (nếu không theo kích thước)"
          value={form.gia}
          onChange={handleChange}
          type="number"
          className="w-full border p-2 rounded"
        />

        <input
          name="hinhAnh"
          placeholder="Link hình ảnh"
          value={form.hinhAnh}
          onChange={handleChange}
          type="text"
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="trangThai"
            checked={form.trangThai}
            onChange={handleChange}
          />
          Đang bán
        </label>

        <div>
          <h3 className="font-semibold mb-2">Kích thước & giá</h3>
          {form.kichThuoc.map((k, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center">
              <input
                placeholder="Tên (vd: Nhỏ, Vừa, Lớn)"
                value={k.ten}
                onChange={(e) =>
                  handleSizeChange(idx, "ten", e.target.value)
                }
                className="flex-1 border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Giá"
                value={k.gia}
                onChange={(e) =>
                  handleSizeChange(idx, "gia", e.target.value)
                }
                className="w-28 border p-2 rounded"
              />
              {form.kichThuoc.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(idx)}
                  className="text-red-500 hover:underline"
                >
                  Xoá
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="text-blue-600 hover:underline text-sm mt-1"
          >
            + Thêm kích thước
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 border rounded hover:bg-gray-100"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
