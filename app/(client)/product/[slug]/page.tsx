import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import { getSingleProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import { HiMiniStar } from "react-icons/hi2";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";
import ProductDescription from "@/components/ProductDescription";
import { ShieldCheck } from "lucide-react";
import RichTextRenderer from "@/components/RichTextRenderer";
import AddToWishListButton from "@/components/AddToWishListButton";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getSingleProduct(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="py-10 bg-slate-50/30 min-h-screen">
      <Container>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 mb-10">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              {product?.images && (
                <ImageView images={product?.images} isStock={product?.stock} />
              )}
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {product?.status && (
                    <span className="uppercase text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-shop_light_blue">
                      {product.status}
                    </span>
                  )}
                  {product?.variant && (
                    <span className="capitalize text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {product.variant}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product?.name}
                </h1>

                {product?.keyfeature ? (
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <RichTextRenderer content={product.keyfeature} />
                  </div>
                ) : null}

                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, index) => (
                      <HiMiniStar key={index} size={18} fill="#f59e0b" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    4.9 (45 customer reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-y border-slate-100 py-4">
                <PriceView
                  price={product?.price}
                  discount={product?.discount}
                  className="text-2xl font-bold min-w-0"
                />
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full shrink-0 whitespace-nowrap ${
                    (product?.stock ?? 0) > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {(product?.stock ?? 0) > 0 ? `In Stock (${product?.stock})` : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <AddToCartButton className="flex-1 h-12 text-sm font-semibold rounded-xl" product={product} />
                <AddToWishListButton product={product} className="h-12 w-12 rounded-xl" />
              </div>

              <ProductCharacteristics product={product} />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-2 hover:text-shop_light_blue transition-colors cursor-pointer">
                  <RxBorderSplit className="text-base text-slate-400" />
                  <span>Compare specs</span>
                </div>
                <div className="flex items-center gap-2 hover:text-shop_light_blue transition-colors cursor-pointer">
                  <FaRegQuestionCircle className="text-base text-slate-400" />
                  <span>Ask a question</span>
                </div>
                <div className="flex items-center gap-2 hover:text-shop_light_blue transition-colors cursor-pointer">
                  <TbTruckDelivery className="text-base text-slate-400" />
                  <span>Fast shipping</span>
                </div>
                <div className="flex items-center gap-2 hover:text-shop_light_blue transition-colors cursor-pointer">
                  <FiShare2 className="text-base text-slate-400" />
                  <span>Share product</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-xs text-shop_light_blue">
                    <BsTruck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Free Express Delivery</p>
                    <p className="text-[11px] text-slate-500">Free nationwide standard shipping on orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-xs text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Official Brand Warranty</p>
                    <p className="text-[11px] text-slate-500">100% authentic product with 12 months official replacement coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 mb-12">
          <ProductDescription product={product} />
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
