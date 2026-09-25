import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/lib/api";
import { Brand } from "@/types";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import { FaTruck } from "react-icons/fa";
import { LuGitCompareArrows } from "react-icons/lu";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { ArrowRight } from "lucide-react";

const extraBrands = [
  {
    title: "Free Express Delivery",
    description: "Free shipping on all orders over $100",
    icon: <FaTruck />,
  },
  {
    title: "30-Day Easy Returns",
    description: "Hassle-free replacement guarantee",
    icon: <LuGitCompareArrows />,
  },
  {
    title: "Dedicated 24/7 Support",
    description: "Instant assistance from tech experts",
    icon: <RiCustomerService2Line />,
  },
  {
    title: "Secure Checkout",
    description: "Encrypted payments powered by Stripe",
    icon: <AiOutlineSafetyCertificate />,
  },
];

const ShopByBrands = async () => {
  const brands: Brand[] = await getAllBrands();

  return (
    <div className="mb-12 lg:mb-16 bg-white border border-slate-100 shadow-sm p-6 lg:p-8 rounded-3xl">
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-shop_light_blue">
            Authorized Partners
          </span>
          <Title className="text-2xl font-bold text-slate-900 mt-0.5">
            Shop By Brands
          </Title>
        </div>
        <Link
          className="text-xs font-semibold text-shop_light_blue hover:text-blue-700 flex items-center gap-1 transition-colors group"
          href="/shop"
        >
          View all brands
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands?.map((brand) => {
          const imageUrl = brand?.image ? urlFor(brand.image).url() : "/fallback-product.png";
          const brandTitle = brand?.title || brand?.name || brand?.brandName || "Brand";

          return (
            <Link
              key={brand?._id || brand?.id || brandTitle}
              href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
              className="bg-slate-50/70 hover:bg-white border border-slate-100/80 hover:border-shop_light_blue/40 rounded-2xl h-28 sm:h-32 flex flex-col items-center justify-between p-3 shadow-xs hover:shadow-md hover:shadow-shop_light_blue/10 transition-all duration-300 hover:-translate-y-1 group"
              title={`Shop ${brandTitle}`}
            >
              <div className="flex-1 flex items-center justify-center w-full min-h-0 py-1">
                {brand?.image ? (
                  <Image
                    src={imageUrl}
                    alt={brandTitle}
                    width={140}
                    height={60}
                    className="max-h-10 sm:max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <span className="font-bold text-sm text-slate-700 group-hover:text-shop_light_blue transition-colors">
                    {brandTitle}
                  </span>
                )}
              </div>

              {/* Title of the brand shown at the bottom of each card */}
              <div className="w-full pt-1.5 border-t border-slate-100/80 group-hover:border-shop_light_blue/20 transition-colors text-center">
                <span className="block text-xs font-semibold text-slate-700 group-hover:text-shop_light_blue transition-colors truncate">
                  {brandTitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Feature Value Props */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-100">
        {extraBrands?.map((brand, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/70 hover:bg-white hover:shadow-xs transition-all duration-200"
          >
            <div className="p-3 rounded-xl bg-blue-50 text-shop_light_blue text-xl shrink-0">
              {brand.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{brand.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;