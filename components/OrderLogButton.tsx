"use client";
import Link from "next/link";
import { Logs } from "lucide-react";
import { usePathname } from "next/navigation";
import { ORDER_QUERY_RESULT } from "@/types";

const OrderLogButton = ({
  order,
}: {
  order: ORDER_QUERY_RESULT | null | undefined;
}) => {
  const pathname = usePathname();
  return (
    <Link href="/order" className="group relative">
      <Logs
        className="text-shop_dark_blue font-extrabold hover:text-shop_light_blue hoverEffect"
        size={18}
      />
      <span
        className="absolute -top-1 -right-1 bg-red-600 
      text-white h-3.5 w-3.5 rounded-full text-xs p-1 font-semibold 
      flex items-center justify-center scale-90 group-hover:scale-100 
      hoverEffect"
      >
        {order?.length ?? 0}
      </span>
      {(order?.length ?? 0) > 0 && (
        <span
          className={`absolute inset-0 -z-10 bg-blue-200 -left-[50%] -top-3 p-5 rounded-2xl w-[150%] 
          scale-0 hoverEffect origin-center ${pathname == "/order" && "scale-100"}`}
        ></span>
      )}
    </Link>
  );
};

export default OrderLogButton;
