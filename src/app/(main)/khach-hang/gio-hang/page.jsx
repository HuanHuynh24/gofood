"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie"; // 👈 Thêm dòng này
import Sidebar from "@/components/Sidebar/Sidebar";
import OrderDialog from "@/components/OrderDialog";
import CheckoutForm from "@/components/CheckoutForm";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const handleOrder = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirmOrder = () => {
    setShowDialog(false);
    setShowCheckoutForm(true);
  };

  const handleSubmitOrder = (formData) => {
    // 👉 Tạo thông tin đơn hàng để lưu
    const newOrder = {
      id: "ORD" + Date.now(), // tạo mã đơn hàng đơn giản
      address: formData.address,
      customerName: formData.name,
      phone: formData.phone,
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      createdAt: new Date().toISOString(),
    };

    // 👉 Lưu vào cookie để xem lại
    Cookies.set("latestOrder", JSON.stringify(newOrder), { expires: 1 / 24 }); // 1 giờ

    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    setCartItems([]);
    setShowCheckoutForm(false);

    // 👉 Có thể điều hướng đến trang chi tiết đơn hàng nếu muốn
    // router.push("/giao-hang/chi-tiet-don-hang");
  };

  const menuItems = [
    { label: "Đơn hàng", url: "/khach-hang" },
    { label: "Xem thông tin đơn hàng", url: "/khach-hang/chi-tiet-don-hang" },
    { label: "Cài đặt", url: "/khach-hang/cai-dat" },
    { label: "Đăng xuất", url: "/logout" },
  ];

  return (
    <div className="flex gap-[30px] bg-white min-h-screen">
      <Sidebar menuItems={menuItems} className={"w-2/12"} />
      <main className="p-4 w-10/12">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b pb-2"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>Kích cỡ: {item.size}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>{(item.price * item.quantity).toLocaleString()}Đ</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <button
            onClick={handleOrder}
            className="w-64 mt-5 bg-[#f4e6c4] py-2 rounded font-semibold hover:opacity-90 hover:cursor-pointer"
          >
            Đặt đơn
          </button>
        )}
        {showDialog && (
          <OrderDialog
            cart={cartItems}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmOrder}
          />
        )}

        {showCheckoutForm && (
          <CheckoutForm
            total={cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
            onSubmit={handleSubmitOrder}
            onClose={() => setShowCheckoutForm(false)}
          />
        )}
      </main>
    </div>
  );
}
