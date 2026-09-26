import Container from "@/components/Container";

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: September 2026</p>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>Your privacy is important to us. We only collect the necessary customer and payment information required to process and ship your orders.</p>
            <h2 className="text-base font-bold text-slate-800 pt-2">Data Protection</h2>
            <p>We do not sell, rent, or trade your personal information to third parties. All payment processing is securely encrypted end-to-end.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
