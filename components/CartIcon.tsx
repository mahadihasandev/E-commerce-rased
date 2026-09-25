"use client";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import useStore from "@/store";
import { usePathname } from "next/navigation";

// Cart icon with a dynamic badge showing the number of items
const CartIcon = () => {
  const pathname = usePathname();

  const { items } = useStore();

  return (
    <Link href={"/cart"} className="group relative">
      <FaCartShopping
        className="text-shop_dark_blue w-5 h-5 group-hover:text-blue-700
      hoverEffect"
      />

      <span
        className="absolute -top-1 -right-1 bg-red-600 text-white h-3.5 w-3.5 
      rounded-full text-xs font-semibold flex items-center justify-center scale-90 
      group-hover:scale-102 transition-transform duration-300"
      >
        {items?.length ? items?.length : 0}
      </span>

      <span
        className={`absolute inset-0 -z-10 bg-blue-200 -left-[40%] -top-2.5 p-5 rounded-2xl w-[150%] 
          scale-0 hoverEffect origin-center ${pathname == "/cart" && "scale-100"}`}
      />
    </Link>
  );
};

export default CartIcon;
