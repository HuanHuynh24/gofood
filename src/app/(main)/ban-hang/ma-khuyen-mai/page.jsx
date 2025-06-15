"use client";

import { useState, useMemo } from "react";
import PromotionForm from "@/components/promotions/PromotionForm";

export default function PromotionPage() {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      tenKhuyenmai: "Mua 1 tặng 1 Pizza",
      giatriKhuyenmai: 100,
      ngayBatDau: "2023-06-01",
      ngayKetThuc: "2025-07-01",
    },
    {
      id: 2,
      tenKhuyenmai: "Giảm 20% cho gia đình",
      giatriKhuyenmai: 20,
      ngayBatDau: "2023-05-01",
      ngayKetThuc: "2024-05-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("tenKhuyenmai");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleAdd = () => {
    setEditingPromotion(null);
    setFormOpen(true);
  };

  const handleEdit = (promo) => {
    setEditingPromotion(promo);
    setFormOpen(true);
  };

  const handleDelete = (promo) => {
    if (confirm(`Xoá khuyến mãi "${promo.tenKhuyenmai}"?`)) {
      setPromotions(promotions.filter((p) => p.id !== promo.id));
    }
  };

  const handleSave = (data) => {
    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((p) => (p.id === editingPromotion.id ? { ...p, ...data } : p))
      );
    } else {
      const newPromo = { ...data, id: Date.now() };
      setPromotions((prev) => [...prev, newPromo]);
    }
    setFormOpen(false);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortArrow = (field) => {
    if (sortBy === field) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  const filteredPromotions = useMemo(() => {
    return promotions
      .filter((p) => {
        const matchSearch = p.tenKhuyenmai
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const now = new Date();
        const end = new Date(p.ngayKetThuc);
        const diffDays = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        if (filterStatus === "ongoing") {
          return matchSearch && end >= now;
        }
        if (filterStatus === "expiring") {
          return matchSearch && diffDays <= 7 && diffDays >= 0;
        }
        if (filterStatus === "ended") {
          return matchSearch && end < now;
        }
        return matchSearch;
      })
      .sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];

        if (sortBy.includes("ngay")) {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        if (typeof aVal === "string") aVal = aVal.toLowerCase();
        if (typeof bVal === "string") bVal = bVal.toLowerCase();

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [promotions, searchQuery, filterStatus, sortBy, sortOrder]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold text-blue-600">🎁 Quản lý khuyến mãi</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Tạo khuyến mãi
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm khuyến mãi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-md shadow-sm"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-md shadow-sm"
        >
          <option value="all">📋 Tất cả</option>
          <option value="ongoing">🟢 Đang diễn ra</option>
          <option value="expiring">🟡 Sắp hết hạn (≤ 7 ngày)</option>
          <option value="ended">🔴 Đã kết thúc</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border cursor-pointer" onClick={() => toggleSort("tenKhuyenmai")}>
                <div className="flex justify-between items-center">
                  <span>Tên khuyến mãi</span>
                  <span>{sortArrow("tenKhuyenmai")}</span>
                </div>
              </th>
              <th className="p-3 border cursor-pointer" onClick={() => toggleSort("giatriKhuyenmai")}>
                <div className="flex justify-between items-center">
                  <span>Giá trị (%)</span>
                  <span>{sortArrow("giatriKhuyenmai")}</span>
                </div>
              </th>
              <th className="p-3 border cursor-pointer" onClick={() => toggleSort("ngayBatDau")}>
                <div className="flex justify-between items-center">
                  <span>Ngày bắt đầu</span>
                  <span>{sortArrow("ngayBatDau")}</span>
                </div>
              </th>
              <th className="p-3 border cursor-pointer" onClick={() => toggleSort("ngayKetThuc")}>
                <div className="flex justify-between items-center">
                  <span>Ngày kết thúc</span>
                  <span>{sortArrow("ngayKetThuc")}</span>
                </div>
              </th>
              <th className="p-3 border text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promo, index) => {
              const now = new Date();
              const endDate = new Date(promo.ngayKetThuc);
              const diffDays = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

              let rowClass = "bg-white";
              if (endDate < now) rowClass = "bg-red-50 text-gray-500";
              else if (diffDays <= 7) rowClass = "bg-yellow-50";

              return (
                <tr key={promo.id} className={`${rowClass} hover:bg-gray-100`}>
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{promo.tenKhuyenmai}</td>
                  <td className="p-3 border text-center">{promo.giatriKhuyenmai}%</td>
                  <td className="p-3 border text-center">{promo.ngayBatDau}</td>
                  <td className="p-3 border text-center">{promo.ngayKetThuc}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(promo)}
                      className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(promo)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      title="Xoá"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredPromotions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Không tìm thấy khuyến mãi phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <PromotionForm
          initialData={editingPromotion}
          onSave={handleSave}
          onCancel={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}
