"use client";

import { useState, useMemo } from "react";
import MonAnForm from "@/components/menu/MonAnForm";
import MonAnList from "@/components/menu/MonAnList";
import mockData from "@/data/monanData";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function MenuPage() {
  const [monAnList, setMonAnList] = useState(mockData);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrangThai, setFilterTrangThai] = useState("all");
  const [sortBy, setSortBy] = useState(null); // "tenMonan" | "gia"
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFormOpen, setFormOpen] = useState(false);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredList = useMemo(() => {
    let list = monAnList
      .filter((item) =>
        item.tenMonan.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((item) => {
        if (filterTrangThai === "all") return true;
        return filterTrangThai === "1"
          ? item.trangThai === true
          : item.trangThai === false;
      });

    if (sortBy) {
      list = [...list].sort((a, b) => {
        const aVal = sortBy === "gia" ? a.gia : a.tenMonan.toLowerCase();
        const bVal = sortBy === "gia" ? b.gia : b.tenMonan.toLowerCase();

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [monAnList, searchQuery, filterTrangThai, sortBy, sortOrder]);

  const handleSave = (data) => {
    if (editingItem) {
      setMonAnList((prev) =>
        prev.map((item) =>
          item.idMonan === editingItem.idMonan ? { ...item, ...data } : item
        )
      );
    } else {
      setMonAnList((prev) => [
        ...prev,
        { ...data, idMonan: `MA${Date.now()}` },
      ]);
    }
    setFormOpen(false);
  };

  const handleDelete = (idMonan) => {
    if (confirm("Bạn chắc chắn muốn xoá món ăn này?")) {
      setMonAnList((prev) => prev.filter((item) => item.idMonan !== idMonan));
    }
  };

  const renderSortIcon = (field) =>
    sortBy === field ? (
      sortOrder === "asc" ? (
        <ChevronUpIcon className="w-4 h-4 ml-1 inline" />
      ) : (
        <ChevronDownIcon className="w-4 h-4 ml-1 inline" />
      )
    ) : (
      <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-400 inline" />
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🍽 Quản lý Món ăn</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow"
        >
          + Thêm món ăn
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full md:w-1/2 shadow-sm"
          placeholder="🔍 Tìm món ăn..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded shadow-sm"
          value={filterTrangThai}
          onChange={(e) => setFilterTrangThai(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="1">Đang bán</option>
          <option value="0">Ngừng bán</option>
        </select>
        <div className="flex gap-2">
          <button
            className={`px-3 py-2 rounded border ${
              sortBy === "tenMonan"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => handleSort("tenMonan")}
          >
            Sắp xếp tên {renderSortIcon("tenMonan")}
          </button>
          <button
            className={`px-3 py-2 rounded border ${
              sortBy === "gia"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => handleSort("gia")}
          >
            Sắp xếp giá {renderSortIcon("gia")}
          </button>
        </div>
      </div>

      <MonAnList
        data={filteredList}
        onEdit={(item) => {
          setEditingItem(item);
          setFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <MonAnForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}
