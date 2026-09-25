import React from "react";
import { getHotDeals } from "@/lib/api";
import { Title } from "@/components/ui/text";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import { Flame, Clock } from "lucide-react";

const DealPage = async () => {
  const hotDeals = await getHotDeals();

  return (
    <div className="py-10 bg-gradient-to-b from-orange-50/40 via-white to-slate-50 min-h-screen">
      <Container>
        <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-xl shadow-orange-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              <Flame size={14} className="text-amber-200 fill-amber-200 animate-pulse" />
              Limited Time Deals
            </div>
            <Title className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Hot Deals of the Week
            </Title>
            <p className="text-orange-100 text-sm max-w-lg">
              Save up to 40% on flagship gadgets, smart wearables, and audio gear. Grab yours before stock runs out!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 self-start md:self-auto">
            <Clock size={18} className="text-amber-300" />
            <span className="text-xs font-medium tracking-wide">Deals refresh every Monday</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {hotDeals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
