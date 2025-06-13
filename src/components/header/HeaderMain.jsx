import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function HeaderMain() {
    return (
        <div className="w-full bg-primary">
            <div className="w-full h-20 flex justify-around items-center">
                <div>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="h-16 w-full"
                    />
                </div>
                <p className="">Bạn cần hỗ trợ?</p>
            </div>
        </div>
    );
}