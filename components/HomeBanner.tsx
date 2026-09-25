"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Banner } from "@/types";
import { getBanners } from "@/lib/api";
import { urlFor } from "@/lib/image";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface HomeBannerProps {
  initialBanners?: Banner[];
}

export const HomeBannerSkeleton = () => {
  return (
    <div className="relative mt-4 mb-6 w-full">
      <div className="relative rounded-3xl h-[320px] sm:h-[400px] md:h-[460px] w-full overflow-hidden bg-slate-900 border border-slate-800 shadow-xl animate-pulse">
        {/* Glow backdrop placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-950/60 p-6 sm:p-12 md:p-16 flex flex-col justify-center max-w-xl space-y-4">
          
          {/* Badge placeholder */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 w-36">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400/40"></div>
            <div className="h-3 w-20 bg-slate-700 rounded-md"></div>
          </div>

          {/* Heading placeholder */}
          <div className="space-y-2.5">
            <div className="h-8 sm:h-11 w-11/12 bg-slate-800 rounded-2xl"></div>
            <div className="h-8 sm:h-11 w-8/12 bg-slate-800 rounded-2xl"></div>
          </div>

          {/* Description placeholder */}
          <div className="space-y-2 pt-1 max-w-md">
            <div className="h-3.5 w-full bg-slate-800/70 rounded-md"></div>
            <div className="h-3.5 w-4/5 bg-slate-800/70 rounded-md"></div>
          </div>

          {/* CTA Button placeholder */}
          <div className="pt-3">
            <div className="h-11 w-40 bg-gradient-to-r from-shop_light_blue/60 to-blue-600/60 rounded-xl shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeBanner: React.FC<HomeBannerProps> = ({ initialBanners = [] }) => {
  const [banner, setBanner] = useState<Banner[]>(initialBanners);
  const [loading, setLoading] = useState(initialBanners.length === 0);

  const plugins = React.useMemo(
    () => [Autoplay({ delay: 5000, stopOnInteraction: false })],
    []
  );

  useEffect(() => {
    if (initialBanners && initialBanners.length > 0) {
      setBanner(initialBanners);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getBanners();
        setBanner(response);
      } catch (error) {
        console.error("fetchData error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialBanners]);

  if (loading || !banner.length) {
    return <HomeBannerSkeleton />;
  }

  const getTargetUrl = (item: Banner): string => {
    if (item.link) {
      if (item.link.startsWith("/")) return item.link;
      return `/product/${item.link}`;
    }
    const slug = Array.isArray(item.productSlug) ? item.productSlug[0] : item.productSlug;
    if (typeof slug === "string" && slug) {
      return `/product/${slug}`;
    }
    return "/product/sony-wh-1000xm5-wireless-headphones";
  };

  return (
    <div className="relative mt-4 mb-6">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={plugins}
      >
        <CarouselContent>
          {banner.map((item, index) => {
            const targetUrl = getTargetUrl(item);
            const imageUrl = item.image ? urlFor(item.image).url() : "/fallback-product.png";

            return (
              <CarouselItem key={item._id || index}>
                <Link
                  href={targetUrl}
                  className="block relative rounded-3xl h-[320px] sm:h-[400px] md:h-[460px] w-full overflow-hidden shadow-lg group cursor-pointer"
                  title={`View ${item.title || "product details"}`}
                >
                  <Image
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    width={1400}
                    height={600}
                    alt={item.title || "Promotional banner"}
                    src={imageUrl}
                    priority={index === 0}
                  />

                  {/* Gradient Overlay for high-end contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent flex items-center p-6 sm:p-12 md:p-16">
                    <div className="max-w-xl text-white space-y-3 sm:space-y-4">
                      {item.subtitle && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide text-shop_light_blue border border-white/10">
                          <Sparkles size={14} className="text-amber-300" />
                          {item.subtitle}
                        </div>
                      )}

                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md group-hover:text-blue-100 transition-colors">
                        {item.title || "Elevate Your Lifestyle with Next-Gen Tech"}
                      </h2>

                      {item.description && (
                        <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 md:line-clamp-3 leading-relaxed drop-shadow-xs max-w-lg">
                          {item.description}
                        </p>
                      )}

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-shop_light_blue group-hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-shop_light_blue/30 transition-all duration-300 group-hover:gap-3 group-hover:shadow-xl">
                          Explore Now
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="hidden sm:block">
          <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-md border-0 text-slate-800 hover:bg-white shadow-md z-10" />
          <CarouselNext className="right-4 bg-white/80 backdrop-blur-md border-0 text-slate-800 hover:bg-white shadow-md z-10" />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeBanner;