'use client';

export default function PromotionCard({ promotion, onEdit, onDelete }) {
  const { tenKhuyenmai, giatriKhuyenmai, ngayBatDau, ngayKetThuc } = promotion;

  const formatDate = (str) => new Date(str).toLocaleDateString("vi-VN");

  return (
    <div className="bg-white border rounded-xl shadow p-4 w-72">
      <div className="font-bold text-lg">{tenKhuyenmai}</div>
      <p className="text-gray-600">Giá trị: {giatriKhuyenmai}%</p>
      <p className="text-sm text-yellow-600">
        {formatDate(ngayBatDau)} → {formatDate(ngayKetThuc)}
      </p>
      <div className="flex gap-2 mt-4">
        <button onClick={onEdit} className="w-full py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Sửa</button>
        <button onClick={onDelete} className="w-full py-1 bg-red-500 text-white rounded hover:bg-red-600">Xoá</button>
      </div>
    </div>
  );
}
