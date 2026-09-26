import Container from "@/components/Container";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-shop_light_blue text-xs font-semibold mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-3 max-w-xl mx-auto">
              Have questions about products, warranty claims, or corporate orders? Our support team is here to assist.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-shop_light_blue flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Email Us</h2>
                <p className="text-xs text-slate-500 mt-1">support@aurashop.com</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Response within 2 hours</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Call Us</h2>
                <p className="text-xs text-slate-500 mt-1">+1 (800) 555-0199</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Mon - Sat: 9 AM - 8 PM</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-500 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Headquarters</h2>
                <p className="text-xs text-slate-500 mt-1">742 Evergreen Terrace</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Silicon Valley, CA</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
