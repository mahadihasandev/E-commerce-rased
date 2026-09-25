"use client";

import React, { useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constant/data";
import { useProducts } from "@/hooks/useQueries";
import { AnimatePresence, motion } from "motion/react";
import { TbLoader3 } from "react-icons/tb";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0].title || "");
  const { data: product = [], isLoading: loading } = useProducts({
    variant: selectedTab.toLowerCase(),
  });

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 min-h-80 gap-3 bg-slate-50/50 rounded-2xl w-full mt-8 border border-slate-100">
          <TbLoader3 className="w-9 h-9 animate-spin text-shop_light_blue" />
          <span className="text-sm font-medium text-slate-500">Loading catalog...</span>
        </div>
      ) : product?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {product?.map((item) => (
            <AnimatePresence key={item._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={item} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} className="mt-8" />
      )}
    </div>
  );
};

export default ProductGrid;