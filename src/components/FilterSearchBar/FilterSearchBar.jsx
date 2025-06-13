"use client"
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const categories = [
  "Trà sữa", "Cơm tấm", "Cafe", "Nước ép", "Bánh mì", "Gà rán",
  "Bún bò", "Phở", "Mì Quảng", "Cơm gà", "Sushi", "Pizza"
];

export default function FilterSearchBar() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollBy = 120; // px mỗi lần scroll

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    checkScroll();
    scrollRef.current.addEventListener("scroll", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollBy : scrollBy,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex  gap-4 p-4 bg-[#f9f6ed] rounded-md relative mt-[30px]">
      {/* Danh mục với nút điều hướng */}
      <div className="relative w-9/12">
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#f0e8d8] p-1 rounded-full shadow"
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide px-8"
          ref={scrollRef}
        >
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition 
                ${activeCategory === cat
                  ? "bg-[#e0d0b5] font-semibold"
                  : "bg-[#f0e8d8] hover:bg-[#e8dec5]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#f0e8d8] p-1 rounded-full shadow"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Tìm kiếm */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm w-3/12">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="outline-none text-sm text-gray-700 placeholder:text-[#f4dcbf] bg-transparent w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={18} className="text-gray-500" />
      </div>
    </div>
  );
}
