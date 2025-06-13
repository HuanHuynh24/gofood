import HeaderMain from "@/components/header/HeaderMain";
import "@/app/globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex gap-6 py-2">
          <Link href={"/signup/nguoi-ban-hang"} className="ml-6 italic text-[14px] font-light">
            Đăng ký với vai trò người bán hàng
          </Link>
          <Link href={"/signup/nguoi-giao-hang"} className="ml-6 italic text-[14px] font-light">
            Đăng ký với vai trò nhân viên giao hàng
          </Link>
        </div>
        <HeaderMain />
        {children}
      </body>
    </html>
  );
}
