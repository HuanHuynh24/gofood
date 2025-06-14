"use client";
import { useState } from "react";

export default function CheckoutForm({ total, onSubmit, onClose }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: {
            street: "",
            city: "",
            district: "",
            ward: "",
        },
        note: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["street", "city", "district", "ward"].includes(name)) {
            setForm((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value,
                },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-md shadow-lg p-6 w-[500px] relative">
                <button onClick={onClose} className="absolute top-3 right-4 text-lg font-bold">×</button>
                <h2 className="text-center text-lg font-bold mb-4">ĐẶT ĐƠN HÀNG</h2>
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <div>
                        <label className="block font-semibold text-red-600">*Tên người nhận:</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-1"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-red-600">*SDT:</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-1"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-red-600">*Địa chỉ:</label>
                        <input
                            name="street"
                            placeholder="Số nhà, tên đường"
                            value={form.address.street}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-1 mb-1"
                        />
                        <input
                            name="city"
                            placeholder="Tỉnh/Thành phố"
                            value={form.address.city}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-1 mb-1"
                        />
                        <input
                            name="district"
                            placeholder="Quận/Huyện"
                            value={form.address.district}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-1 mb-1"
                        />
                        <input
                            name="ward"
                            placeholder="Xã/Phường"
                            value={form.address.ward}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-1"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Ghi chú</label>
                        <input
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-1"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Tổng hoá đơn:</label>
                        <input
                            value={total.toLocaleString() + "Đ"}
                            disabled
                            className="w-full border rounded px-3 py-1 bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-[#f4e6c4] py-2 rounded font-bold hover:bg-[#e9dbba]"
                    >
                        Đặt đơn hàng
                    </button>
                </form>
            </div>
        </div>
    );
}
