import Link from "next/link";
import { Title } from "./ui/text";
import Image from "next/image";
import { banner_1, banner_2 } from "@/images";
import { ArrowRight, Tag } from "lucide-react";

const StaticHomeBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 mb-2">
      {/* Banner 1 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-orange-100/60 rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-xs hover:shadow-md transition-shadow group">
        <div className="space-y-3 z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold">
            <Tag size={12} />
            Budget Friendly
          </div>
          <Title className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            Save up to ৳500 on Audio Gear
          </Title>
          <p className="text-xs text-slate-500 hidden sm:block">
            Special discounts applied directly at checkout on select headphones.
          </p>
          <div className="pt-1">
            <Link
              href={{ pathname: "/shop", query: { price: "100-500" } }}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-shop_light_blue text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all duration-200 group-hover:gap-2.5"
            >
              Shop Deals <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <div className="relative w-36 sm:w-48 h-36 sm:h-44 flex items-center justify-center shrink-0">
          <Image
            className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500"
            src={banner_1}
            alt="Audio promo"
            priority
          />
        </div>
      </div>

      {/* Banner 2 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border border-blue-100/60 rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-xs hover:shadow-md transition-shadow group">
        <div className="space-y-3 z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold">
            <Tag size={12} />
            Flagship Sale
          </div>
          <Title className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            Get ৳2000 off Smart Watches
          </Title>
          <p className="text-xs text-slate-500 hidden sm:block">
            Exclusive seasonal voucher codes applicable on premium wearables.
          </p>
          <div className="pt-1">
            <Link
              href={{ pathname: "/shop", query: { price: "1000-2000" } }}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-shop_light_blue text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all duration-200 group-hover:gap-2.5"
            >
              Claim Voucher <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <div className="relative w-36 sm:w-48 h-36 sm:h-44 flex items-center justify-center shrink-0">
          <Image
            className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500"
            src={banner_2}
            alt="Smartwatch promo"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default StaticHomeBanner;
