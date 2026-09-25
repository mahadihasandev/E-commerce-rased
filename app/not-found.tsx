import Logo from "@/components/Logo";
import Link from "next/link";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-slate-50/50 flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-shop_light_blue tracking-wider uppercase">
            404 — Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Looking for something?
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page or product you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-shop_light_blue hover:bg-blue-600 shadow-sm hover:shadow-md hover:shadow-shop_light_blue/20 transition-all duration-200"
          >
            <Home size={16} />
            Back to Homepage
          </Link>
          <Link
            href="/shop"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Explore Product Catalog
          </Link>
        </div>

        <p className="text-xs text-slate-400 pt-4 border-t border-slate-100 flex items-center justify-center gap-1">
          <HelpCircle size={14} />
          Need assistance?{" "}
          <Link href="/about" className="font-semibold text-shop_light_blue hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
