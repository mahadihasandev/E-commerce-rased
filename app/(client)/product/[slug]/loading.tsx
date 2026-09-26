import Container from "@/components/Container";
import { Loader2, ShieldCheck, Truck, Sparkles, Share2, HelpCircle, Layers, Star } from "lucide-react";

export default function ProductDetailsLoading() {
  return (
    <div className="py-10 bg-slate-50/30 min-h-screen">
      <Container>
        {/* Subtle Live Loading Notification */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/80 text-shop_light_blue text-xs font-semibold shadow-xs animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Loading product details...</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Fetching live stock & pricing</span>
          </div>
        </div>

        {/* Main Product Card Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 mb-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Image Skeleton */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="relative w-full aspect-square max-h-[500px] bg-slate-100/80 rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center overflow-hidden shimmer">
                <div className="w-20 h-20 rounded-2xl bg-white/70 shadow-xs flex items-center justify-center text-slate-300">
                  <Sparkles className="w-8 h-8 animate-pulse text-shop_light_blue/40" />
                </div>
                <p className="mt-3 text-xs font-medium text-slate-400 animate-pulse">
                  Preparing high-res visuals...
                </p>
              </div>

              {/* Thumbnail Gallery Skeleton */}
              <div className="flex items-center gap-3 overflow-hidden pt-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-2xl bg-slate-100/90 border border-slate-200/50 shrink-0 shimmer"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Details Skeleton */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 bg-blue-100/70 rounded-full shimmer" />
                  <div className="h-5 w-20 bg-slate-100 rounded-full shimmer" />
                </div>

                {/* Product Title */}
                <div className="space-y-2 pt-1">
                  <div className="h-8 w-4/5 bg-slate-200/80 rounded-xl shimmer" />
                  <div className="h-8 w-2/5 bg-slate-200/60 rounded-xl shimmer" />
                </div>

                {/* Key Features preview lines */}
                <div className="space-y-2 pt-2">
                  <div className="h-3.5 w-full bg-slate-100 rounded-md shimmer" />
                  <div className="h-3.5 w-11/12 bg-slate-100 rounded-md shimmer" />
                  <div className="h-3.5 w-3/4 bg-slate-100 rounded-md shimmer" />
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-slate-200 fill-slate-200" />
                    ))}
                  </div>
                  <div className="h-4 w-32 bg-slate-100 rounded-md shimmer" />
                </div>
              </div>

              {/* Price & Stock bar */}
              <div className="flex items-center justify-between border-y border-slate-100 py-4">
                <div className="flex items-baseline gap-3">
                  <div className="h-9 w-32 bg-slate-200 rounded-xl shimmer" />
                  <div className="h-6 w-20 bg-slate-100 rounded-lg shimmer" />
                </div>
                <div className="h-7 w-28 bg-emerald-50 border border-emerald-100 rounded-full shimmer" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-12 bg-slate-900/10 rounded-xl shimmer" />
                <div className="h-12 w-12 bg-slate-100 rounded-xl shimmer shrink-0" />
              </div>

              {/* Product Characteristics skeleton */}
              <div className="space-y-2.5 py-3 border-y border-slate-100">
                <div className="h-4 w-28 bg-slate-200 rounded-md shimmer mb-3" />
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-1">
                      <div className="h-3.5 w-20 bg-slate-100 rounded shimmer" />
                      <div className="h-3.5 w-24 bg-slate-200/70 rounded shimmer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick action icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2 text-xs text-slate-300 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-300" />
                  <div className="h-3 w-16 bg-slate-100 rounded shimmer" />
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-300" />
                  <div className="h-3 w-16 bg-slate-100 rounded shimmer" />
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-300" />
                  <div className="h-3 w-16 bg-slate-100 rounded shimmer" />
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-slate-300" />
                  <div className="h-3 w-16 bg-slate-100 rounded shimmer" />
                </div>
              </div>

              {/* Value proposition badges */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-xs text-shop_light_blue/50">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-36 bg-slate-200 rounded shimmer" />
                    <div className="h-3 w-48 bg-slate-100 rounded shimmer" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-xs text-emerald-500/50">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-36 bg-slate-200 rounded shimmer" />
                    <div className="h-3 w-48 bg-slate-100 rounded shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Description Card Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 mb-12">
          <div className="h-6 w-48 bg-slate-200 rounded-lg shimmer mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-100 rounded-md shimmer" />
            <div className="h-4 w-11/12 bg-slate-100 rounded-md shimmer" />
            <div className="h-4 w-4/5 bg-slate-100 rounded-md shimmer" />
            <div className="h-4 w-2/3 bg-slate-100 rounded-md shimmer" />
          </div>
        </div>
      </Container>
    </div>
  );
}
