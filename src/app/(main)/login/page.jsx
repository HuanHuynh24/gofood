"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import image1 from "@/assets/images/image1.png";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const accounts = {
    "khachhang":"123",
    "admin":"123",
    "giaohang":"123",
    "banhang":"123"
  }

  const handleLogin = () => {
    document.cookie = "token=sample_token; path=/";
    router.push("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf4] px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-4xl w-full">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">GOFOOD</h1>
          <p className="text-lg mb-6">
            Đăng nhập vào và tận hưởng những
            <br />
            ưu đãi của GoFood
          </p>
          <div className="inline-block">
            <Image src={image1} alt="Fries" width={300} height={300} priority />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Số điện thoại"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Mã OTP"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-[#f4e6c4] px-4 py-2 rounded text-sm font-semibold">
                Gửi mã
              </button>
            </div>
            <button
              className="w-full bg-[#f4e6c4] py-2 rounded font-semibold hover:opacity-90 hover:cursor-pointer" 
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
            <div className="flex items-center gap-2">
              <hr className="flex-grow border-gray-300" />
              <span className="text-sm text-gray-500">Hoặc</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button className="w-full border border-black py-2 rounded font-semibold hover:bg-gray-50">
              <Link href="/signup/khach-hang">Đăng ký</Link>
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            Việc đăng ký, bạn đã đồng ý mọi điều khoản
            <br />
            của chúng tôi
          </p>
        </div>
      </div>
    </div>
  );
}
