import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import StaticHomeBanner from "@/components/StaticHomeBanner";
import { getCategories, getBanners } from "@/lib/api";

// Main storefront homepage (Server Component fetching initial data)
const page = async () => {
  const [categories, banners] = await Promise.all([
    getCategories(6),
    getBanners(),
  ]);

  return (
    <div className="bg-gradient-to-b from-white via-slate-50/50 to-white min-h-screen">
      <Container>
        <HomeBanner initialBanners={banners} />
        <StaticHomeBanner />

        <div className="md:py-12 py-8">
          <ProductGrid />
        </div>

        <HomeCategories categories={categories} />

        <ShopByBrands />
        <LatestBlog />
      </Container>
    </div>
  );
};

export default page;
