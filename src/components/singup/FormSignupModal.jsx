import Image from "next/image";
import { FaFacebookF, FaGoogle, FaPhoneAlt } from "react-icons/fa";

export default function FormSignupModal({ title, image, setShowModal }) {
  return (
    <div className="bg-white rounded-xl shadow-md flex max-w-5xl w-full overflow-hidden">
      <div className="w-1/2 p-8 flex flex-col justify-center bg-[#fdfbf6]">
        <h1 className="text-3xl font-bold mb-4">GOFOOD</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">{title}</p>
        <div className="relative w-full h-52">
          <Image src={image} alt="Fries" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-6">Đăng ký</h2>

        {/* Phone Input with Icon */}
        <div className="flex items-center border border-gray-300 rounded px-4 py-2 mb-4 focus-within:ring-2 focus-within:ring-yellow-400">
          <FaPhoneAlt className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full outline-none"
          />
        </div>

        {/* Đăng ký button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-100 hover:bg-yellow-200 font-semibold py-2 px-4 rounded w-full mb-5 transition-colors"
        >
          Đăng ký
        </button>

        {/* Hoặc */}
        <div className="flex items-center mb-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Hoặc</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 mb-4">
          <button className="flex items-center justify-center gap-2 flex-1 border border-gray-300 rounded py-2 font-semibold hover:bg-gray-50 transition">
            <FaFacebookF className="text-blue-600" />
            Facebook
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 border border-gray-300 rounded py-2 font-semibold hover:bg-gray-50 transition">
            <FaGoogle className="text-red-500" />
            Google
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500 mt-2">
          Việc đăng ký, bạn đã đồng ý mọi điều khoản của chúng tôi
        </p>
      </div>
    </div>
  );
}
