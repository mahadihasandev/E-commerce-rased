"use client";

import { Product } from "@/types";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GiFlame } from "react-icons/gi";
import AddToWishListButton from "./AddToWishListButton";
import { Title } from "./ui/text";
import { HiMiniStar } from "react-icons/hi2";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: Props) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Do not trigger outer card navigation if user clicked inside buttons, inputs or links
    if (target.closest("button") || target.closest("a") || target.closest("[role='button']")) {
      return;
    }
    if (product?.slug?.current) {
      router.push(`/product/${product.slug.current}`);
    }
  };

  const imageUrl =
    product?.images && product.images.length > 0
      ? urlFor(product.images[0]).url()
      : "/fallback-product.png";

  const categoriesText = product?.categories
    ?.map((cat) => {
      if (typeof cat === "string") return cat;
      if (typeof cat === "object" && cat !== null) {
        const c = cat as { title?: string; name?: string };
        return c.title || c.name || "";
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        `group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:shadow-shop_light_blue/10 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 cursor-pointer select-none`,
        className
      )}
    >
      <div className="relative bg-slate-50/80 p-4 overflow-hidden aspect-square flex items-center justify-center">
        <Link
          href={`/product/${product?.slug?.current}`}
          prefetch={true}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            height={400}
            width={400}
            alt={product?.name || "Product Image"}
            className={`w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108 ${
              product?.stock === 0 ? "opacity-40 grayscale" : ""
            }`}
            src={imageUrl}
            loading="lazy"
          />
        </Link>

        <AddToWishListButton
          product={product}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md shadow-xs hover:bg-white rounded-full p-2"
        />

        {product?.status === "sale" && (
          <span className="absolute left-3 top-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
            Sale
          </span>
        )}
        {product?.status === "new" && (
          <span className="absolute left-3 top-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
            New
          </span>
        )}
        {product?.status === "hot" && (
          <Link
            href="/deal"
            className="absolute left-3 top-3 z-10 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-xs hover:bg-amber-600 transition-colors"
          >
            <GiFlame size={12} className="fill-white" />
            Hot
          </Link>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          {categoriesText && (
            <p className="uppercase line-clamp-1 text-[11px] font-semibold text-slate-400 tracking-wider mb-1">
              {categoriesText}
            </p>
          )}

          <Link href={`/product/${product?.slug?.current}`} prefetch={true}>
            <Title className="text-sm! font-bold text-slate-900 group-hover:text-shop_light_blue transition-colors line-clamp-2 leading-snug">
              {product?.name}
            </Title>
          </Link>

          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, index) => (
                <HiMiniStar
                  key={index}
                  size={13}
                  className={index < 4 ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-slate-400">(4.8)</span>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-50">
          <div className="flex items-center justify-between gap-[7px]">
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-base font-bold min-w-0"
            />
            <span
              className={`text-[11px] font-semibold shrink-0 whitespace-nowrap translate-x-[7px] ${
                (product?.stock ?? 0) > 0 ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {(product?.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <AddToCartButton
            product={product}
            className="w-full rounded-xl text-xs font-semibold py-2.5 h-auto shadow-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
