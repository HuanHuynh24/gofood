"use client";
import { useState } from "react";
import nguoiBanHangData from "@/data/nguoiBanHang";
import UserDetailDialog from "@/components/UserDetailDialog";

export default function NguoiBanPage() {
    const [sellers, setSellers] = useState(nguoiBanHangData);
    const [filteredSellers, setFilteredSellers] = useState(nguoiBanHangData);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const result = sellers.filter((seller) =>
            seller.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSellers(result);
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        const sorted = [...filteredSellers].sort((a, b) => {
            const nameA = a.hoTen.toLowerCase();
            const nameB = b.hoTen.toLowerCase();
            if (nameA < nameB) return order === "asc" ? -1 : 1;
            if (nameA > nameB) return order === "asc" ? 1 : -1;
            return 0;
        });
        setFilteredSellers(sorted);
    };

    const handleApprove = (seller) => {
        const updated = sellers.map((s) =>
            s.idNguoiBanHang === seller.idNguoiBanHang
                ? { ...s, trangThai: "Đã duyệt" }
                : s
        );
        setSellers(updated);
        setFilteredSellers(updated);
        setSelectedSeller(null);
        alert(`✅ Đã duyệt người bán hàng: ${seller.hoTen}`);
    };

    const columns = [
        { header: "ID", key: "idNguoiBanHang" },
        { header: "Email", key: "email" },
        { header: "Họ tên", key: "hoTen" },
        { header: "CCCD", key: "cccd" },
        { header: "Trạng thái", key: "trangThai" },
        { header: "Mật khẩu", key: "matKhau" },
        { header: "SĐT", key: "soDienThoai" },
        { header: "Tỉnh/TP", key: "tinh_ThanhPho" },
        { header: "Huyện/Quận", key: "huyen_Quan" },
        { header: "Xã/Phường", key: "xa_Phuong" },
        { header: "Số nhà", key: "soNha_Thon" },
        { header: "GPKD", key: "maGiayPhepKinhDoanh" },
        { header: "VSATTP", key: "maGiayVeSinhAnToanThucPham" },
        {
            header: "Thao tác",
            key: "action",
            render: (row) => (
                <div className="flex justify-center">
                    <button
                        onClick={() => setSelectedSeller(row)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-all shadow"
                        title="Xem chi tiết"
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
                    <h1 className="text-2xl font-bold text-blue-600">🛍️ Danh sách người bán hàng</h1>
                </div>

                <div className="mb-4 flex flex-col md:flex-row items-center gap-3">
                    <input
                        type="text"
                        className="border px-3 py-2 rounded w-full md:w-1/3"
                        placeholder="Nhập họ tên người bán..."
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
                    <table className="w-full min-w-[1000px] table-auto border-collapse text-sm">
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
                            {filteredSellers.length > 0 ? (
                                filteredSellers.map((row) => (
                                    <tr key={row.idNguoiBanHang} className="bg-white hover:bg-gray-50 transition-all">
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
                                        Không có dữ liệu người bán hàng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {selectedSeller && (
                <UserDetailDialog
                    customer={selectedSeller}
                    onClose={() => setSelectedSeller(null)}
                    onApprove={handleApprove}
                    mode="review"
                />
            )}
        </div>
    );
}
