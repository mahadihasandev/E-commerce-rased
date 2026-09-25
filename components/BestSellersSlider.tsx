"use client";

import React from "react";
import { useBestSellers } from "@/hooks/useQueries";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Title } from "./ui/text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flame, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

interface BestSellersSliderProps {
  initialProducts?: Product[];
}

export const BestSellersSliderSkeleton = () => {
  return (
    <div className="py-8 my-6 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-rose-500/5 rounded-3xl p-6 border border-amber-500/10">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-7 w-52 bg-slate-200 rounded-xl animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-2xl bg-slate-100 border border-slate-200/60 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default function BestSellersSlider({
  initialProducts = [],
}: BestSellersSliderProps) {
  const { data: products = initialProducts, isLoading } = useBestSellers(
    12,
    initialProducts.length ? initialProducts : undefined
  );

  const loading = isLoading && (!products || products.length === 0);

  if (loading) {
    return <BestSellersSliderSkeleton />;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 my-6 bg-gradient-to-br from-amber-500/[0.04] via-orange-500/[0.03] to-slate-50/50 rounded-3xl p-5 sm:p-7 border border-amber-500/15 shadow-sm">
      <Carousel
        opts={{
          align: "start",
          loop: products.length > 5,
        }}
        className="w-full relative"
      >
        {/* Header with Title and Slider Nav Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-amber-500/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20 mb-2">
              <Flame size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
              <span>Customer Favorites</span>
            </div>
            <Title className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Best Sellers
              <Sparkles size={20} className="text-amber-400" />
            </Title>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Our highest-selling gear, verified customer favorites, and top-trending electronic picks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              href="/shop"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline mr-3 hidden md:inline-block"
            >
              View full catalog &rarr;
            </Link>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-y-0 h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 shadow-xs" />
              <CarouselNext className="static translate-y-0 h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 shadow-xs" />
            </div>
          </div>
        </div>

        {/* Carousel Content Slides */}
        <CarouselContent className="-ml-3 sm:-ml-4">
          {products.map((product, index) => {
            const salesCount = product.sales_count ?? 0;

            return (
              <CarouselItem
                key={product._id || product.id || index}
                className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="relative h-full flex flex-col group">
                  {/* Rank & Sales Badge Overlay */}
                  <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 pointer-events-none">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-lg text-[10px] font-black tracking-wider uppercase shadow-xs ${
                        index === 0
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-amber-500/20"
                          : index === 1
                          ? "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900 font-bold"
                          : index === 2
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold"
                          : "bg-white/90 backdrop-blur-md text-slate-700 font-semibold border border-slate-200"
                      }`}
                    >
                      #{index + 1}
                    </span>

                    {salesCount > 0 ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-black/75 text-emerald-400 backdrop-blur-md">
                        <TrendingUp size={10} />
                        {salesCount} sold
                      </span>
                    ) : null}
                  </div>

                  <ProductCard product={product} className="h-full" />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
