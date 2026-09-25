"use client";

import { Brand, Category, Product } from "@/types";
import React, { useState, useEffect } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./Shop/CategoryList";
import BrandList from "./Shop/BrandList";
import PriceList from "./Shop/PriceList";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useQueries";
import ProductCard from "./ProductCard";
import { TbLoader3 } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RotateCcw, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams.get("brand");
  const priceParams = searchParams.get("price");
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1);
  }

  const [prevPriceParams, setPrevPriceParams] = useState(priceParams);
  if (priceParams !== prevPriceParams) {
    setPrevPriceParams(priceParams);
    setSelectedPrice(priceParams);
    setCurrentPage(1);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, selectedPrice]);

  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  if (selectedPrice) {
    const [min, max] = selectedPrice.split("-").map(Number);
    minPrice = min;
    maxPrice = max;
  }

  const perPage = 12;

  const { data: products = [], isLoading: loading } = useProducts({
    category: selectedCategory,
    brand: selectedBrand,
    minPrice,
    maxPrice,
    page: currentPage,
    limit: perPage,
  });

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedBrand !== null ||
    selectedPrice !== null;

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedPrice(null);
    setCurrentPage(1);
  };

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
                Showing page {currentPage} • {products.length} products on this page
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
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

          <main className="flex-1 min-w-0 w-full" id="catalog-grid">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 min-h-[400px] space-y-3 bg-white rounded-3xl border border-slate-100 shadow-sm w-full">
                <TbLoader3 className="w-10 h-10 animate-spin text-shop_light_blue" />
                <span className="text-sm font-semibold text-slate-600">Updating catalog...</span>
              </div>
            ) : products?.length > 0 ? (
              <div className="space-y-8">
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

                {/* Pagination Controls */}
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <button
                    disabled={currentPage <= 1 || loading}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      document.getElementById("catalog-grid")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={14} />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-shop_light_blue/10 text-shop_light_blue border border-shop_light_blue/20">
                      Page {currentPage}
                    </span>
                  </div>

                  <button
                    disabled={products.length < perPage || loading}
                    onClick={() => {
                      setCurrentPage((p) => p + 1);
                      document.getElementById("catalog-grid")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-shop_light_blue hover:bg-shop_light_blue/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
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
