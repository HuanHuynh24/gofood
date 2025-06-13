"use client";
import FormSignupModal from "@/components/singup/FormSignupModal";
import image3 from "@/assets/images/image3.png";
import { useState } from "react";
import ShopRegisterForm from "@/components/singup/ShopRegisterForm";
export default function SignUp() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#fdfbf6] flex items-center justify-center p-4 ">
      <FormSignupModal title={"Đăng ký để trở  thành người giao hàng đáng tin cậy của GoFood"} image={image3} setShowModal={setShowModal} />
      <ShopRegisterForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
