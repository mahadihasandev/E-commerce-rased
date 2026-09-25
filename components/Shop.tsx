"use client";

import { Brand, Category, Product } from "@/types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./Shop/CategoryList";
import BrandList from "./Shop/BrandList";
import PriceList from "./Shop/PriceList";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { TbLoader3 } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const Shop = ({ categories, brands }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const brandParams = searchParams.get("brand");
  const priceParams = searchParams.get("price");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(
    priceParams || null
  );

  const [prevBrandParams, setPrevBrandParams] = useState(brandParams);
  if (brandParams !== prevBrandParams) {
    setPrevBrandParams(brandParams);
    setSelectedBrand(brandParams);
  }

  const [prevPriceParams, setPrevPriceParams] = useState(priceParams);
  if (priceParams !== prevPriceParams) {
    setPrevPriceParams(priceParams);
    setSelectedPrice(priceParams);
  }

  useEffect(() => {
    let ignore = false;
    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      minPrice = min;
      maxPrice = max;
    }

    getProducts({
      category: selectedCategory,
      brand: selectedBrand,
      minPrice,
      maxPrice,
    })
      .then((result) => {
        if (!ignore) {
          setProducts(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Fetching product error:", error);
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [selectedCategory, selectedBrand, selectedPrice]);

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedBrand !== null ||
    selectedPrice !== null;

  return (
    <div>
      <Container>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-shop_light_blue rounded-xl">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <Title className="text-lg font-bold text-slate-900 leading-none">
                Catalog & Filter Store
              </Title>
              <p className="text-xs text-slate-500 mt-1">
                Found {products.length} products matching your criteria
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
                setSelectedPrice(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl px-4 py-2 transition-colors"
            >
              <RotateCcw size={13} />
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <aside className="hidden md:block w-72 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className="my-5 border-t border-slate-100" />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <div className="my-5 border-t border-slate-100" />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </aside>

          <div className="md:hidden w-full">
            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-100 p-2 shadow-xs">
              <AccordionItem value="filters" className="border-0">
                <AccordionTrigger className="text-sm font-bold text-slate-800 px-4 py-2">
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-shop_light_blue" />
                    Filter Products
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-2">
                  <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                  <div className="my-4 border-t border-slate-100" />
                  <BrandList
                    brands={brands}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                  />
                  <div className="my-4 border-t border-slate-100" />
                  <PriceList
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <main className="flex-1 min-w-0 w-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 min-h-[400px] space-y-3 bg-white rounded-3xl border border-slate-100 shadow-sm w-full">
                <TbLoader3 className="w-10 h-10 animate-spin text-shop_light_blue" />
                <span className="text-sm font-semibold text-slate-600">Updating catalog...</span>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((item: Product) => (
                  <AnimatePresence key={item._id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={item} />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 p-8 text-center">
                <p className="text-base font-bold text-slate-800">No products match the selected filters.</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">Try resetting filters or picking another category.</p>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
