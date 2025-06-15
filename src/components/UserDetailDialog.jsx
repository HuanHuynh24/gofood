"use client";
import { useEffect, useState } from "react";

export default function CustomerEditDialog({
    customer,
    onClose,
    onSave,
    onApprove,
    onReject,
    mode = "edit", // "edit" | "review"
}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(customer || {});
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (mode === "edit") {
            onSave?.(formData);
        }
    };

    if (!customer) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-[9999]">
            <div className="bg-white p-6 rounded-lg shadow-md w-[600px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {mode === "edit" ? "Cập nhật khách hàng" : "Thông tin chi tiết"}
                </h2>

                <div className="space-y-3">
                    <InputField
                        label="Họ và tên"
                        name="hoTen"
                        value={formData.hoTen}
                        onChange={handleChange}
                        readOnly={mode === "review"}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={mode === "review"}
                    />
                    <InputField
                        label="SĐT"
                        name="soDienThoai"
                        value={formData.soDienThoai}
                        onChange={handleChange}
                        readOnly={mode === "review"}
                    />

                    {mode === "edit" && (
                        <InputField
                            label="Mật khẩu"
                            name="matKhau"
                            value={formData.matKhau}
                            onChange={handleChange}
                        />
                    )}

                    {/* Hiển thị các trường riêng nếu ở chế độ review */}
                    {mode === "review" && (
                        <>
                            {formData.cccd && (
                                <InputField label="CCCD" value={formData.cccd} readOnly />
                            )}
                            {formData.bangLaiXe && (
                                <InputField label="Bằng lái xe" value={formData.bangLaiXe} readOnly />
                            )}
                            {formData.giayDangKIXe && (
                                <InputField label="Giấy Đăng ký xe" value={formData.giayDangKIXe} readOnly />
                            )}
                            {formData.tinh_ThanhPho && (
                                <>
                                    <InputField label="Tỉnh/TP" value={formData.tinh_ThanhPho} readOnly />
                                    <InputField label="Huyện/Quận" value={formData.huyen_Quan} readOnly />
                                    <InputField label="Xã/Phường" value={formData.xa_Phuong} readOnly />
                                    <InputField label="Số nhà" value={formData.soNha_Thon} readOnly />
                                </>
                            )}
                            {formData.maGiayPhepKinhDoanh && (
                                <InputField
                                    label="Mã giấy phép kinh doanh"
                                    value={formData.maGiayPhepKinhDoanh}
                                    readOnly
                                />
                            )}
                            {formData.maGiayVeSinhAnToanThucPham && (
                                <InputField
                                    label="Mã giấy VSATTP"
                                    value={formData.maGiayVeSinhAnToanThucPham}
                                    readOnly
                                />
                            )}
                            <InputField label="Trạng thái" value={formData.trangThai} readOnly />
                        </>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        {mode === "edit" ? "Huỷ" : "Đóng"}
                    </button>

                    {mode === "edit" && (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={handleSubmit}
                        >
                            Cập nhật
                        </button>
                    )}

                    {mode === "review" && (
                        <>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded mr-2"
                                onClick={() => onApprove?.(formData)}
                            >
                                ✅ Duyệt
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded"
                                onClick={() => onReject?.(formData)}
                            >
                                ❌ Không duyệt
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, type = "text", readOnly = false }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                className={`w-full px-3 py-2 border rounded ${readOnly ? 'bg-gray-100' : 'bg-white'}`}
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                readOnly={readOnly}
            />
        </div>
    );
}
