import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | AuraShop — Next-Gen Electronics",
    default: "AuraShop — Premium Electronics, Audio & Smart Gadgets",
  },
  description:
    "Explore the latest smartphones, ultrabooks, spatial audio headphones, and smart home appliances with lightning-fast delivery and official warranties.",
};

// Root wrapper for client storefront pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30 selection:bg-shop_light_blue selection:text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
