import Link from "next/link";

// ============================================
// TYPES
// ============================================
interface DocumentItem {
  title: string;
  size: string;
  href: string;
}

// ============================================
// DOCUMENT LINK COMPONENT
// ============================================
function DocumentLink({ title, size, href }: DocumentItem) {
  return (
    <a
      href={href}
      className="block p-6 border border-gray-200 hover:border-black transition-colors group focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2"
      download
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg group-hover:text-bvp-navy transition-colors">
            {title}
          </p>
          <p className="text-gray-500 text-sm">{size}</p>
        </div>
        <span className="text-gray-400 group-hover:text-black transition-colors text-xl">
          ↓
        </span>
      </div>
    </a>
  );
}

// ============================================
// MAIN FINANCIALS PAGE
// ============================================
export default function FinancialsPage() {
  const annualReports: DocumentItem[] = [
    { title: "2025 Annual Report", size: "PDF • 2.4 MB", href: "#" },
    { title: "2024 Annual Report", size: "PDF • 2.1 MB", href: "#" },
    { title: "2023 Annual Report", size: "PDF • 1.9 MB", href: "#" },
  ];

  const form990s: DocumentItem[] = [
    { title: "2024 Form 990", size: "PDF • 850 KB", href: "#" },
    { title: "2023 Form 990", size: "PDF • 820 KB", href: "#" },
    { title: "2022 Form 990", size: "PDF • 790 KB", href: "#" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 bg-white border-b border-gray-200">
        <div className="py-12 md:py-16 px-6 md:px-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Transparency
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight font-display">
              Financials & 990
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 px-6 md:px-24">
        <div className="max-w-[900px]">
          <p className="text-xl leading-relaxed mb-12 text-gray-700">
            Black Veterans Project is committed to transparency and
            accountability. Below you'll find our annual reports, financial
            statements, and IRS Form 990 filings.
          </p>

          {/* Annual Reports */}
          <h2 className="text-2xl font-bold mb-6 font-display">
            Annual Reports
          </h2>
          <div className="space-y-4 mb-12">
            {annualReports.map((doc) => (
              <DocumentLink key={doc.title} {...doc} />
            ))}
          </div>

          {/* Form 990s */}
          <h2 className="text-2xl font-bold mb-6 font-display">IRS Form 990</h2>
          <div className="space-y-4 mb-12">
            {form990s.map((doc) => (
              <DocumentLink key={doc.title} {...doc} />
            ))}
          </div>

          {/* Tax-Exempt Status */}
          <h2 className="text-2xl font-bold mb-6 font-display">
            Tax-Exempt Status
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Black Veterans Project is a 501(c)(3) nonprofit organization.
              Donations are tax-deductible to the fullest extent allowed by law.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>EIN:</strong> XX-XXXXXXX
            </p>
          </div>

          {/* Questions CTA */}
          <div className="mt-12 p-6 bg-gray-100 border-l-4 border-bvp-gold">
            <p className="text-gray-700 mb-4">
              Have questions about our financials or operations?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold text-black hover:text-bvp-navy transition-colors"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
