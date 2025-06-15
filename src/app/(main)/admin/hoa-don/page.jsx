"use client";
import { useState } from "react";
import hoaDonData from "@/data/hoaDon";
import HoaDonDetailDialog from "@/components/HoaDonDetailDialog";

export default function NguoiGiaoPage() {
    const [shippers, setShippers] = useState(hoaDonData);
    const [selectedShipper, setSelectedShipper] = useState(null);

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
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                    <h1 className="text-2xl font-bold text-blue-600">🚚 Danh sách người giao hàng</h1>
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
                            {shippers.length > 0 ? (
                                shippers.map((row) => (
                                    <tr key={row.id} className="bg-white hover:bg-gray-50 transition-all">
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className="p-3 border text-center">
                                                {col.key === "action" ? col.render(row) : row[col.key] || "—"}
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
