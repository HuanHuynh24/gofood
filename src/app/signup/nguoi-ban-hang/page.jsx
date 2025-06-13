"use client";
import FormSignupModal from "@/components/singup/FormSignupModal";
import ShopInfoModal from "@/components/singup/ShopInfoModal";
import image3 from "@/assets/images/image3.png";
import { useState } from "react";
export default function SignUp() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#fdfbf6] flex items-center justify-center p-4 ">
      <FormSignupModal title={"Đăng ký để trở  thành nhà bán hàng thông minh"} image={image3} setShowModal={setShowModal} />
      <ShopInfoModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
