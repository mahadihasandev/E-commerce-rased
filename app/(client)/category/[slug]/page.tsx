import CategoryProduct from "@/components/CategoryProduct";
import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getCategories } from "@/lib/api";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await getCategories();
  const { slug } = await params;

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <Container>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-shop_light_blue">
              Browsing Category
            </span>
            <Title className="text-2xl md:text-3xl font-extrabold text-slate-900 capitalize mt-1">
              {slug ? slug.replace(/-/g, " ") : "All Categories"}
            </Title>
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            Discover our curated catalog with fast delivery and official brand warranty.
          </p>
        </div>

        <CategoryProduct categories={categories} slugs={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;