"use client";
import { useState } from "react";
import hoaDonData from "@/data/hoaDon";
import HoaDonDetailDialog from "@/components/HoaDonDetailDialog";

export default function HoaDonPage() {
    const [shippers, setShippers] = useState(hoaDonData);
    const [selectedShipper, setSelectedShipper] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const filtered = hoaDonData.filter((item) =>
            item.hoten.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setShippers(filtered);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        const sorted = [...shippers].sort((a, b) => {
            const nameA = a.hoten.toLowerCase();
            const nameB = b.hoten.toLowerCase();
            if (nameA < nameB) return order === "asc" ? -1 : 1;
            if (nameA > nameB) return order === "asc" ? 1 : -1;
            return 0;
        });
        setShippers(sorted);
    };

    const columns = [
        { header: "ID", key: "id" },
        { header: "Họ tên", key: "hoten" },
        { header: "Email", key: "email" },
        { header: "SĐT", key: "sdt" },
        { header: "Địa chỉ", key: "diachi" },
        { header: "CCCD", key: "cccd" },
        { header: "Ngày bắt đầu", key: "ngaybatdau" },
        { header: "Ngày kết thúc", key: "ngayketthuc" },
        {
            header: "Thao tác",
            key: "action",
            render: (row) => (
                <div className="flex justify-center">
                    <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        title="Xem chi tiết"
                        onClick={() => setSelectedShipper(row)}
                    >
                        👁️ Xem chi tiết
                    </button>
                </div>
            ),
        },
    ];

    const handleApprove = (shipper) => {
        const updated = shippers.map((s) =>
            s.id === shipper.id ? { ...s, trangThai: "Đã duyệt" } : s
        );
        setShippers(updated);
        setSelectedShipper(null);
        alert(`✅ Đã duyệt người giao hàng: ${shipper.hoten}`);
    };

    return (
        <div className="flex gap-6 p-4">
            <main className="flex-1 bg-white rounded-lg shadow-md p-6">
                {/* Tiêu đề */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-blue-600 mb-3">
                        🚚 Danh sách người giao hàng
                    </h1>

                    {/* Tìm kiếm và sắp xếp */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="text"
                            placeholder="Tìm theo họ tên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border px-3 py-2 rounded w-60"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            🔍 Tìm kiếm
                        </button>
                        <select
                            value={sortOrder || ""}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="border px-3 py-2 rounded"
                        >
                            <option value="">Sắp xếp tên</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                </div>

                {/* Bảng */}
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index} className="p-3 border text-left">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {shippers.length > 0 ? (
                                shippers.map((row) => (
                                    <tr key={row.id} className="bg-white hover:bg-gray-50 transition-all">
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className="p-3 border text-center">
                                                {col.key === "action"
                                                    ? col.render(row)
                                                    : row[col.key] || "—"}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                                        Không có dữ liệu người giao hàng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {selectedShipper && (
                <HoaDonDetailDialog
                    customer={selectedShipper}
                    onClose={() => setSelectedShipper(null)}
                    onApprove={handleApprove}
                    mode="review"
                />
            )}
        </div>
    );
}
