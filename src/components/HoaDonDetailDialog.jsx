"use client";
import React from "react";

export default function HoaDonDetailDialog({
    customer,
    onClose,
    onApprove,
    onReject,
    mode = "review",
}) {
    if (!customer) return null;

    const {
        id,
        hoten,
        email,
        sdt,
        diachi,
        cccd,
        ngaybatdau,
        ngayketthuc,
        avatar = "../assets/images/hoadon.jpg", // ảnh mặc định
    } = customer;

    const handleApprove = () => {
        if (onApprove) onApprove(customer);
        onClose();
    };

    const handleReject = () => {
        if (onReject) onReject(customer);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-[9999]">
            <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold text-center mb-6 text-black">XEM CHI TIẾT DUYỆT</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-black">
                        <p><strong>Tên người dùng:</strong> {hoten}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>SDT:</strong> {sdt}</p>
                        <p><strong>Địa chỉ:</strong> {diachi}</p>
                        <p><strong>Ngày bắt đầu:</strong> {ngaybatdau}</p>
                        <p><strong>Ngày kết thúc:</strong> {ngayketthuc}</p>
                        <p><strong>CCCD:</strong> {cccd}</p>
                    </div>

                    <div className="text-center">
                        <p className="mb-2 font-semibold">Minh chứng nộp tiền</p>
                        <img
                            src={`/images/${avatar}`}
                            alt="Ảnh minh chứng"
                            className="w-full max-w-[300px] h-auto mx-auto rounded-lg shadow border"
                        />
                    </div>
                </div>

                {mode === "review" && (
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={handleApprove}
                            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded shadow"
                        >
                            Duyệt
                        </button>
                        <button
                            onClick={handleReject}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded shadow"
                        >
                            Từ chối duyệt
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
