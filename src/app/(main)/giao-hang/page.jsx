import OrderCard from "@/components/OderCard/OrderCard";
import Sidebar from "@/components/Sidebar/Sidebar";

const menuItems = [
  { label: "Đơn hàng", url: "/giao-hang" },
  { label: "Xem lịch sử giao hàng", url: "/giao-hang/lich-su-giao-hang" },
  { label: "Cài đặt", url: "/giao-hang/cai-dat" },
  { label: "Đăng xuất", url: "/logout" },
];

export default function GiaoHangPage() {
  const fakeOrders = [
    {
      orderId: "100405kh011",
      shopAddress: "Hà Huy Tập, Thanh Khê, Đà Nẵng",
      deliveryAddress: "Thanh Thủy, Hải Châu, Đà Nẵng",
      total: "139.000",
    },
    {
      orderId: "100406kh012",
      shopAddress: "Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
      deliveryAddress: "Trần Cao Vân, Thanh Khê, Đà Nẵng",
      total: "89.000",
    },
    {
      orderId: "100407kh013",
      shopAddress: "Lê Duẩn, Hải Châu, Đà Nẵng",
      deliveryAddress: "Hoàng Diệu, Hải Châu, Đà Nẵng",
      total: "159.000",
    },
  ];
  return (
    <div className="flex gap-[30px] bg-white min-h-screen">
      <Sidebar menuItems={menuItems} className={"w-2/12"} />
      <main className="p-4 px-0 w-10/12">
        <div className="p-6 pl-0 space-y-6 mx-auto">
          {fakeOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              orderId={order.orderId}
              shopAddress={order.shopAddress}
              deliveryAddress={order.deliveryAddress}
              total={order.total}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
