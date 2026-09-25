import { Product } from "@/types";
import { getBrands } from "@/lib/api";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrands(product?.slug?.current as string);
  const brandObj =
    typeof product?.brand === "object" && product.brand !== null
      ? (product.brand as { brandName?: string; title?: string })
      : null;

  const brandName =
    brand?.[0]?.brandName ||
    brand?.[0]?.title ||
    brandObj?.brandName ||
    brandObj?.title ||
    "Official Store";

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-slate-100">
        <AccordionTrigger className="text-sm font-bold text-slate-800 py-3 hover:no-underline hover:text-shop_light_blue">
          Key Specifications & Details
        </AccordionTrigger>
        <AccordionContent className="space-y-2.5 text-xs text-slate-600 pt-1">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <span className="text-slate-400">Brand</span>
            <span className="font-semibold text-slate-900">{brandName}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <span className="text-slate-400">Release Year</span>
            <span className="font-semibold text-slate-900">2026 Edition</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <span className="text-slate-400">Category / Type</span>
            <span className="font-semibold text-slate-900 capitalize">
              {product?.variant || "Consumer Tech"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-400">Availability</span>
            <span
              className={`font-semibold ${
                (product?.stock as number) > 0 ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {(product?.stock as number) > 0 ? `In Stock (${product?.stock} units)` : "Out of Stock"}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;