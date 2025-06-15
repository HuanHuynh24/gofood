'use client';

import { useState } from 'react';
import PromotionCard from '@/components/promotions/PromotionCard';
import PromotionForm from '@/components/promotions/PromotionForm';

export default function PromotionPage() {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      tenKhuyenmai: 'Mua 1 tặng 1 Pizza',
      giatriKhuyenmai: 100,
      ngayBatDau: '2023-06-01',
      ngayKetThuc: '2023-06-30',
    },
    {
      id: 2,
      tenKhuyenmai: 'Giảm 20% cho gia đình',
      giatriKhuyenmai: 20,
      ngayBatDau: '2023-05-01',
      ngayKetThuc: '2023-05-15',
    },
  ]);

  const [editingPromotion, setEditingPromotion] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleAdd = () => {
    setEditingPromotion(null);
    setFormOpen(true);
  };

  const handleEdit = (promo) => {
    setEditingPromotion(promo);
    setFormOpen(true);
  };

  const handleDelete = (promo) => {
    if (confirm(`Xoá khuyến mãi "${promo.tenKhuyenmai}"?`)) {
      setPromotions(promotions.filter((p) => p.id !== promo.id));
    }
  };

  const handleSave = (data) => {
    if (editingPromotion) {
      // Update
      setPromotions((prev) =>
        prev.map((p) => (p.id === editingPromotion.id ? { ...p, ...data } : p))
      );
    } else {
      // Add
      const newPromo = { ...data, id: Date.now() };
      setPromotions((prev) => [...prev, newPromo]);
    }
    setFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý khuyến mãi</h1>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Tạo khuyến mãi
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            promotion={promo}
            onEdit={() => handleEdit(promo)}
            onDelete={() => handleDelete(promo)}
          />
        ))}
      </div>

      {isFormOpen && (
        <PromotionForm
          initialData={editingPromotion}
          onSave={handleSave}
          onCancel={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}
