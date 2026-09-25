"use client";

import { Category, Product } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProducts } from "@/hooks/useQueries";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { TbLoader3 } from "react-icons/tb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layers } from "lucide-react";

interface Props {
  categories: Category[];
  slugs: string;
}

const CategoryProduct = ({ categories, slugs }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slugs);
  const router = useRouter();

  const { data: products = [], isLoading: loading } = useProducts({
    category: currentSlug,
  });

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  return (
    <div className="py-2 flex flex-col gap-8 items-start md:flex-row">
      {/* Desktop Category Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-3 sticky top-24">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          Categories
        </div>
        <div className="space-y-1">
          {categories.map((category) => {
            const isActive = category?.slug?.current === currentSlug;
            return (
              <button
                key={category?._id}
                onClick={() =>
                  handleCategoryChange(category?.slug?.current as string)
                }
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? "bg-shop_light_blue text-white shadow-md shadow-shop_light_blue/20"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{category.title}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Accordion */}
      <div className="w-full md:hidden">
        <Accordion
          type="single"
          collapsible
          className="w-full bg-white rounded-2xl border border-slate-100 p-2 shadow-xs"
        >
          <AccordionItem value="category" className="border-0">
            <AccordionTrigger className="text-sm font-bold text-slate-800 px-3 py-2">
              <span className="flex items-center gap-2">
                <Layers size={16} className="text-shop_light_blue" />
                Select Category
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 px-1">
              <div className="space-y-1">
                {categories.map((category) => {
                  const isActive = category?.slug?.current === currentSlug;
                  return (
                    <button
                      key={category?._id}
                      onClick={() =>
                        handleCategoryChange(category?.slug?.current as string)
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                        isActive
                          ? "bg-shop_light_blue text-white"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {category.title}
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Products Grid */}
      <div className="flex-1 w-full min-w-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px] space-y-3 bg-white rounded-3xl border border-slate-100 shadow-sm w-full">
            <TbLoader3 className="w-10 h-10 animate-spin text-shop_light_blue" />
            <span className="text-sm font-medium text-slate-500">Loading products...</span>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((item: Product) => (
              <AnimatePresence key={item?._id}>
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
          <NoProductAvailable
            selectedTab={currentSlug}
            className="w-full min-h-[350px] bg-white rounded-3xl border border-slate-100 shadow-sm"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
