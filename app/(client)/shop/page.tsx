import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/lib/api";
import React, { Suspense } from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div className="bg-slate-50/50 min-h-screen py-6">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-shop_light_blue border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;