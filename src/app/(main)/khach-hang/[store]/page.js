import FoodItemCard from "@/components/FoodCard/FoodItemCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import foodData from "@/data/foodData";
import { toSlug } from "@/lib/slugify";
import CartIcon from "@/components/FoodCard/CartIcon";

export async function generateStaticParams() {
  const uniqueStores = [...new Set(foodData.map((item) => item.store))];

  return uniqueStores.map((store) => ({
    store: toSlug(store),
  }));
}
const menuLists = [
  { label: "Đơn hàng", url: "/khach-hang" },
  { label: "Xem thông tin đơn hàng", url: "/khach-hang/chi-tiet-don-hang" },
  { label: "Cài đặt", url: "/khach-hang/cai-dat" },
  { label: "Đăng xuất", url: "/logout" },
];
export default async function StoreMenu({ params }) {
  const storeSlug = params.store;

  const menuItems = foodData.filter((item) => toSlug(item.store) === storeSlug);

  if (menuItems.length === 0) {
    return <div className="p-4">Không tìm thấy quán ăn.</div>;
  }

  return (
    <div className="flex gap-[30px]">
      <Sidebar menuItems={menuLists} />
      <main className="pr-[30px]">
        <div className="p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">
              Menu: {menuItems[0].store}
            </h1>
            <CartIcon />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <FoodItemCard
                key={index}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                addToCart={{}}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
