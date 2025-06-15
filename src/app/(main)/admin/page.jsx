// app/admin/page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/khach-hang");
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen text-gray-500">
            Đang chuyển hướng đến trang quản lý khách hàng...
        </div>
    );
}
