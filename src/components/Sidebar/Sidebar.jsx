'use client';
import React from "react";
import Link from "next/link";

export default function Sidebar({ className, menuItems }) {
  return (
    <aside className={`bg-[#fdfbf5] border-r border-gray-200 min-h-[700px] p-4 ${className ? className : "w-64"}`}>
      <nav className="flex flex-col space-y-4 sticky top-0 pt-[30px]">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="bg-[#f9f5e9] text-gray-800 px-4 py-3 rounded text-left hover:bg-[#f3eddc] transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
