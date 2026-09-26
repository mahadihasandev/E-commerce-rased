import Container from "@/components/Container";
import { HelpCircle, Mail, Phone, Clock, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      q: "How fast is express delivery?",
      a: "All orders placed before 3 PM are dispatched on the same day. Standard delivery takes 1-3 business days across the country.",
    },
    {
      q: "How does the warranty claim work?",
      a: "All electronics sold through AuraShop come with 12 months official manufacturer warranty. Contact our support or submit your order number to initiate a claim.",
    },
    {
      q: "What is your return policy?",
      a: "We offer a 7-day hassle-free return and exchange policy for items in their original packaging and unopened seals.",
    },
    {
      q: "How can I track my shipment?",
      a: "Once your order is processed, you will receive a tracking ID via email and SMS. You can also view live tracking under your Account Orders tab.",
    },
  ];

  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mb-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-shop_light_blue text-xs font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Customer Assistance & Support Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-3 max-w-xl mx-auto">
            Find instant answers to common questions about orders, shipping, official warranties, and returns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
              <Truck className="w-6 h-6 text-shop_light_blue mb-2" />
              <h2 className="text-sm font-bold text-slate-900">Track Order</h2>
              <p className="text-xs text-slate-500 mt-1">Check the live status of your incoming delivery.</p>
              <Link href="/order" className="inline-block mt-3 text-xs font-semibold text-shop_light_blue hover:underline">
                View orders &rarr;
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
              <RotateCcw className="w-6 h-6 text-amber-500 mb-2" />
              <h2 className="text-sm font-bold text-slate-900">Returns & Refunds</h2>
              <p className="text-xs text-slate-500 mt-1">7-day replacement guarantee on defective units.</p>
              <Link href="/contact" className="inline-block mt-3 text-xs font-semibold text-shop_light_blue hover:underline">
                Contact team &rarr;
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
              <h2 className="text-sm font-bold text-slate-900">Warranty Coverage</h2>
              <p className="text-xs text-slate-500 mt-1">12 months official brand warranty protection.</p>
              <Link href="/contact" className="inline-block mt-3 text-xs font-semibold text-shop_light_blue hover:underline">
                Verify serial &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm max-w-4xl mx-auto mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-shop_light_blue rounded-2xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Still have questions?</p>
              <p className="text-xs text-slate-500">Our customer support specialists are ready 24/7.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:support@aurashop.com"
              className="px-5 py-2.5 bg-shop_light_blue text-white rounded-xl text-xs font-semibold hover:bg-shop_light_blue/90 transition-all shadow-xs"
            >
              Email Support
            </a>
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
