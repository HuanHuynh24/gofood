"use client";
import { useState } from "react";
import nguoiBanHangData from "@/data/nguoiBanHang";
import UserDetailDialog from "@/components/UserDetailDialog";

export default function NguoiBanPage() {
    const [sellers, setSellers] = useState(nguoiBanHangData);
    const [selectedSeller, setSelectedSeller] = useState(null);

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

    const handleApprove = (seller) => {
        const updated = sellers.map((s) =>
            s.idNguoiBanHang === seller.idNguoiBanHang
                ? { ...s, trangThai: "Đã duyệt" }
                : s
        );
        setSellers(updated);
        setSelectedSeller(null);
        alert(`✅ Đã duyệt người bán hàng: ${seller.hoTen}`);
    };

    return (
        <div className="flex flex-col p-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-600">🚚 Danh sách người bán hàng</h1>

            <div className="w-full overflow-x-auto rounded border border-gray-200">
                <table className="w-full min-w-[1000px] table-auto border-collapse text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="border p-2 text-left">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.length > 0 ? (
                            sellers.map((row) => (
                                <tr key={row.idNguoiBanHang} className="hover:bg-gray-50">
                                    {columns.map((col, index) => (
                                        <td key={index} className="border p-2 text-center align-top">
                                            {col.key === "action" ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">
                                    Không có dữ liệu người bán hàng.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
