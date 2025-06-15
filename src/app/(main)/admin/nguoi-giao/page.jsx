"use client";
import { useState } from "react";
import nguoiGiaoHangData from "@/data/nguoiGiaoHang";
import UserDetailDialog from "@/components/UserDetailDialog";

export default function NguoiGiaoPage() {
    const [shippers, setShippers] = useState(nguoiGiaoHangData);
    const [filteredShippers, setFilteredShippers] = useState(nguoiGiaoHangData);
    const [selectedShipper, setSelectedShipper] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        const sorted = [...filteredShippers].sort((a, b) => {
            const nameA = a.hoTen.toLowerCase();
            const nameB = b.hoTen.toLowerCase();
            if (nameA < nameB) return order === "asc" ? -1 : 1;
            if (nameA > nameB) return order === "asc" ? 1 : -1;
            return 0;
        });
        setFilteredShippers(sorted);
    };

    const handleSearch = () => {
        const result = shippers.filter((shipper) =>
            shipper.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredShippers(result);
    };

    const handleApprove = (shipper) => {
        const updated = shippers.map((s) =>
            s.idNguoiGiaoHang === shipper.idNguoiGiaoHang
                ? { ...s, trangThai: "Đã duyệt" }
                : s
        );
        setShippers(updated);
        setFilteredShippers(updated);
        setSelectedShipper(null);
        alert(`✅ Đã duyệt người giao hàng: ${shipper.hoTen}`);
    };

    const columns = [
        { header: "ID", key: "idNguoiGiaoHang" },
        { header: "Họ và tên", key: "hoTen" },
        { header: "Email", key: "email" },
        { header: "SĐT", key: "soDienThoai" },
        { header: "CCCD", key: "cccd" },
        { header: "Bằng lái xe", key: "bangLaiXe" },
        { header: "Giấy ĐK xe", key: "giayDangKIXe" },
        { header: "Trạng thái", key: "trangThai" },
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
                        👁️ Xem
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex gap-6 p-4">
            <main className="flex-1 bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                    <h1 className="text-2xl font-bold text-blue-600">🚚 Danh sách người giao hàng</h1>
                </div>

                <div className="mb-4 flex flex-col md:flex-row items-center gap-3">
                    <input
                        type="text"
                        className="border px-3 py-2 rounded w-full md:w-1/3"
                        placeholder="Nhập tên người giao hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleSearch}
                    >
                        🔍 Tìm kiếm
                    </button>

                    <select
                        className="border px-3 py-2 rounded"
                        value={sortOrder || ""}
                        onChange={handleSortChange}
                    >
                        <option value="">Sắp xếp tên</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>

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
                            {filteredShippers.length > 0 ? (
                                filteredShippers.map((row) => (
                                    <tr key={row.idNguoiGiaoHang} className="bg-white hover:bg-gray-50 transition-all">
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className="p-3 border text-center">
                                                {col.key === "action" ? col.render(row) : row[col.key]}
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
                <UserDetailDialog
                    customer={selectedShipper}
                    onClose={() => setSelectedShipper(null)}
                    onApprove={handleApprove}
                    mode="review"
                />
            )}
        </div>
    );
}
