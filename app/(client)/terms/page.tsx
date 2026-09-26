import Container from "@/components/Container";

export default function TermsPage() {
  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
          <p className="text-xs text-slate-400">Last updated: September 2026</p>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>Welcome to AuraShop. By accessing and using our service, you agree to comply with our terms and purchase conditions.</p>
            <h2 className="text-base font-bold text-slate-800 pt-2">1. Purchases and Pricing</h2>
            <p>All prices are listed in USD and include applicable taxes unless stated otherwise. We reserve the right to correct typographical pricing errors before order fulfillment.</p>
            <h2 className="text-base font-bold text-slate-800 pt-2">2. Official Warranties</h2>
            <p>All items sold are authentic and covered by their respective manufacturer warranty.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
