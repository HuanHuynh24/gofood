// pages/admin/AdminPage.jsx
"use client";
import { useState } from "react";
import customersData from "@/data/customers";
import UserDetailDialog from "@/components/UserDetailDialog";

export default function AdminPage() {
    const [customers, setCustomers] = useState(customersData);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá không?");
        if (confirmDelete) {
            const updated = customers.filter((khach) => khach.idKhachHang !== id);
            setCustomers(updated);
        }
    };

    const handleUpdate = (updatedCustomer) => {
        const updatedList = customers.map((kh) =>
            kh.idKhachHang === updatedCustomer.idKhachHang ? updatedCustomer : kh
        );
        setCustomers(updatedList);
        setEditingCustomer(null);
    };

    const columns = [
        { header: "ID", key: "idKhachHang" },
        { header: "Họ và tên", key: "hoTen" },
        { header: "Email", key: "email" },
        { header: "SĐT", key: "soDienThoai" },
        { header: "Mật khẩu", key: "matKhau" },
        {
            header: "Thao tác",
            key: "action",
            render: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        className="px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                        title="Sửa"
                        onClick={() => setEditingCustomer(row)}
                    >
                        ✏️
                    </button>
                    <button
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        title="Xoá"
                        onClick={() => handleDelete(row.idKhachHang)}
                    >
                        🗑️
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex gap-6 p-4">
            <main className="flex-1 bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                    <h1 className="text-2xl font-bold text-blue-600">🧑‍💼 Danh sách khách hàng</h1>
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
                            {customers.length > 0 ? (
                                customers.map((row) => (
                                    <tr key={row.idKhachHang} className="bg-white hover:bg-gray-50 transition-all">
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
                                        Không có dữ liệu khách hàng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {editingCustomer && (
                <UserDetailDialog
                    customer={editingCustomer}
                    onClose={() => setEditingCustomer(null)}
                    onSave={handleUpdate}
                    mode="edit"
                />
            )}
        </div>
    );
}
