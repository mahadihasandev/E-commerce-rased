import React from "react";
import { Title } from "./ui/text";
import { Category } from "@/types";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CategoryWithCount = Category & {
  productCount?: number;
};

const HomeCategories = ({
  categories,
}: {
  categories: CategoryWithCount[];
}) => {
  return (
    <div className="bg-white border border-slate-100 shadow-sm my-10 md:my-16 p-6 lg:p-8 rounded-3xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-shop_light_blue">
            Top Selections
          </span>
          <Title className="text-2xl font-bold text-slate-900 mt-0.5">
            Popular Categories
          </Title>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-shop_light_blue hover:text-blue-700 flex items-center gap-1 transition-colors group"
        >
          View all categories
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => {
          const imageUrl = category?.image ? urlFor(category.image).url() : "/fallback-product.png";
          return (
            <Link
              key={category._id}
              href={`/category/${category?.slug?.current}`}
              className="bg-slate-50/70 hover:bg-white p-4 rounded-2xl border border-slate-100/80 hover:border-shop_light_blue/30 shadow-xs hover:shadow-lg hover:shadow-shop_light_blue/5 flex items-center gap-4 group transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-white border border-slate-100 w-20 h-20 shrink-0 p-1.5 shadow-2xs">
                <Image
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                  alt={category?.title || "Category Image"}
                  width={160}
                  height={160}
                  src={imageUrl}
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-shop_light_blue transition-colors truncate">
                  {category?.title}
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  <span className="text-shop_light_blue font-semibold">
                    {category?.productCount ?? 12}
                  </span>{" "}
                  Products available
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCategories;
