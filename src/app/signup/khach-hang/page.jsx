"use client";
import Image from "next/image";
import image2 from "@/assets/images/image2.png";
import { useState } from "react";
import RegisterModal from "@/components/singup/RegisterModal";
import FormSignupModal from "@/components/singup/FormSignupModal";

export default function SignUp() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#fdfbf6] flex items-center justify-center p-4 ">
      <FormSignupModal title={"Đăng ký để trở  thành khách hàng thân thiết của GoFood"} image={image2} setShowModal={setShowModal} />
      <RegisterModal  isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
