"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ============================================
// TYPES
// ============================================
interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

// ============================================
// FAQ DATA
// ============================================
const faqSections: FAQSection[] = [
  {
    title: "About BVP",
    items: [
      {
        question: "What is Black Veterans Project?",
        answer: (
          <>
            <p className="mb-4">
              Black Veterans Project is a nonprofit organization dedicated to securing reparative justice for Black veterans and military families. We work through impact litigation, narrative storytelling, and movement-building to address systemic inequities in the VA benefits system and military institutions.
            </p>
            <p>
              Founded in 2019, BVP has become a leading voice in the fight for racial equity in veterans' affairs, partnering with legal clinics, advocacy organizations, and grassroots movements to create lasting change.
            </p>
          </>
        ),
      },
      {
        question: "Is BVP a nonprofit?",
        answer: (
          <p>
            Yes, Black Veterans Project is a registered 501(c)(3) nonprofit organization. Our EIN is publicly available on our financials page, and all donations are tax-deductible to the extent allowed by law.
          </p>
        ),
      },
      {
        question: "Is it tax-deductible to donate?",
        answer: (
          <p>
            Yes, all donations to Black Veterans Project are tax-deductible. As a 501(c)(3) nonprofit organization, we provide donation receipts for your tax records. Please consult your tax advisor for specific guidance on your situation.
          </p>
        ),
      },
      {
        question: "How is BVP governed?",
        answer: (
          <p>
            BVP is governed by an independent Board of Directors comprising veterans, legal experts, and community leaders. Our board provides strategic oversight, ensures fiscal responsibility, and guides our mission. You can learn more about our board members on our About page.
          </p>
        ),
      },
      {
        question: "Where can I find BVP's financial information?",
        answer: (
          <p>
            Our annual reports, Form 990s, and audited financial statements are available on our{" "}
            <Link href="/financials" className="text-black font-semibold underline underline-offset-2 hover:text-bvp-navy">
              Financials page
            </Link>
            . We believe in full transparency and make all required nonprofit disclosures publicly accessible.
          </p>
        ),
      },
      {
        question: "Who are BVP's partners?",
        answer: (
          <p>
            BVP partners with leading legal institutions, advocacy organizations, and research bodies including Yale Law School's Veterans Legal Services Clinic, Harvard Law School, and Quinn Emanuel Urquhart & Sullivan. Our partnerships enable us to pursue impact litigation and advance policy change at the highest levels.
          </p>
        ),
      },
    ],
  },
  {
    title: "Monk v. United States",
    items: [
      {
        question: "What is Monk v. United States?",
        answer: (
          <>
            <p className="mb-4">
              Monk v. United States is a landmark federal lawsuit filed by Black Veterans Project and our legal partners challenging systemic racial discrimination in the VA benefits system. The case alleges that the Department of Veterans Affairs has systematically denied or underrated disability benefits claims from Black veterans at higher rates than white veterans.
            </p>
            <p>
              The case seeks both systemic reform of VA practices and compensation for affected veterans. It represents one of the most significant civil rights actions in veterans' affairs history.
            </p>
          </>
        ),
      },
      {
        question: "Does BVP provide direct legal services?",
        answer: (
          <>
            <p className="mb-4">
              BVP focuses on impact litigation and systemic advocacy rather than individual legal representation. However, we work closely with legal partners who can provide direct services.
            </p>
            <div className="bg-black text-white p-6 rounded-lg">
              <p className="text-base leading-relaxed">
                For individual legal assistance with VA benefits claims, please{" "}
                <a
                  href="https://law.yale.edu/clinics/veterans-legal-services-clinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bvp-gold underline underline-offset-2 hover:text-white"
                >
                  contact the Yale Law School Veterans Legal Services Clinic
                </a>
                .
              </p>
            </div>
          </>
        ),
      },
      {
        question: "Am I eligible to be part of the Monk case?",
        answer: (
          <p>
            Eligibility for the Monk case depends on specific criteria related to denied or underrated VA benefits claims. If you are a Black veteran who has experienced discrimination in the VA benefits process, we encourage you to share your story with us through our contact form. Our legal partners will review potential cases as the litigation proceeds.
          </p>
        ),
      },
      {
        question: "What is the current status of the Monk case?",
        answer: (
          <p>
            The Monk case is actively proceeding through the federal court system. For the latest updates on the case, please sign up for our newsletter or follow our press coverage. We provide regular updates to our members and the public as significant developments occur.
          </p>
        ),
      },
      {
        question: "How do I file an FTCA claim related to VA discrimination?",
        answer: (
          <>
            <p className="mb-4">
              Filing a Federal Tort Claims Act (FTCA) claim requires specific procedures and deadlines. You must file an administrative claim with the VA within two years of the alleged harm, and the VA has six months to respond before you can file in federal court.
            </p>
            <p>
              We strongly recommend consulting with a veterans' rights attorney before filing an FTCA claim. Our legal partners at Yale Law School's Veterans Legal Services Clinic may be able to assist with complex cases.
            </p>
          </>
        ),
      },
      {
        question: "What if my late family member was denied benefits — can I file?",
        answer: (
          <p>
            Surviving family members may have standing to pursue certain claims related to denied benefits. The rules depend on factors including the type of benefit, when the denial occurred, and your relationship to the veteran. We recommend consulting with a veterans' benefits attorney to understand your options.
          </p>
        ),
      },
      {
        question: "How do I appeal a denied VA disability claim?",
        answer: (
          <p>
            The VA has a multi-step appeals process including Supplemental Claims, Higher-Level Review, and Board of Veterans' Appeals review. Each option has different requirements and timelines. Free assistance is available through Veterans Service Organizations (VSOs), accredited claims agents, and legal aid clinics specializing in veterans' benefits.
          </p>
        ),
      },
      {
        question: "How can I prove a family member was denied GI Bill benefits?",
        answer: (
          <p>
            Documentation may include VA correspondence, application records, military discharge papers (DD-214), and historical records from educational institutions. The National Archives and National Personnel Records Center maintain military records. For descendants seeking to document historical discrimination, our team can provide guidance on research approaches.
          </p>
        ),
      },
    ],
  },
  {
    title: "Get Involved",
    items: [
      {
        question: "How do I become a BVP member?",
        answer: (
          <p>
            Joining BVP is free and open to all supporters of our mission. Visit our{" "}
            <Link href="/join" className="text-black font-semibold underline underline-offset-2 hover:text-bvp-navy">
              Join page
            </Link>{" "}
            to sign up as a Basic Member or Advocate. Members receive updates on our work, invitations to events, and opportunities to participate in campaigns.
          </p>
        ),
      },
      {
        question: "What are the benefits of BVP membership?",
        answer: (
          <p>
            Members receive regular updates on our litigation, narrative projects, and mobilization efforts. Advocates gain access to training, campaign resources, and opportunities to represent BVP at events. Your membership strengthens our voice when we speak before Congress, the courts, and the press.
          </p>
        ),
      },
      {
        question: "How can I volunteer with BVP?",
        answer: (
          <p>
            We welcome volunteers for various roles including event support, community outreach, research assistance, and storytelling projects. Sign up as an Advocate member to be notified of volunteer opportunities, or contact us directly with your interests and skills.
          </p>
        ),
      },
      {
        question: "How can I share my story with BVP?",
        answer: (
          <p>
            Your story matters. Veterans and family members can share their experiences through our{" "}
            <Link href="/contact" className="text-black font-semibold underline underline-offset-2 hover:text-bvp-navy">
              contact form
            </Link>
            . Stories may be used in our narrative projects, advocacy efforts, or legal research — always with your explicit consent and control over how your story is shared.
          </p>
        ),
      },
      {
        question: "How can my foundation support BVP?",
        answer: (
          <p>
            We welcome partnerships with foundations, corporations, and institutional donors. Please contact us at{" "}
            <a href="mailto:info@blackveteransproject.org" className="text-black font-semibold underline underline-offset-2 hover:text-bvp-navy">
              info@blackveteransproject.org
            </a>{" "}
            to discuss grant opportunities, sponsorships, or strategic partnerships aligned with our mission.
          </p>
        ),
      },
    ],
  },
];

// ============================================
// ACCORDION ITEM COMPONENT
// ============================================
interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  sectionIndex: number;
}

function AccordionItem({ item, isOpen, onToggle, index, sectionIndex }: AccordionItemProps) {
  const id = useId();
  const headerId = `faq-header-${sectionIndex}-${index}-${id}`;
  const panelId = `faq-panel-${sectionIndex}-${index}-${id}`;

  return (
    <div className="border-b border-gray-300">
      <h3>
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-6 text-left focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2 group"
        >
          <span className="text-lg md:text-xl font-bold group-hover:text-bvp-navy transition-colors">
            {item.question}
          </span>
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isOpen ? "bg-black rotate-180" : "bg-gray-500"
            }`}
            aria-hidden="true"
          >
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="2 5 7 10 12 5" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// FAQ SECTION COMPONENT
// ============================================
interface FAQSectionComponentProps {
  section: FAQSection;
  sectionIndex: number;
  openItems: Set<string>;
  onToggle: (key: string) => void;
}

function FAQSectionComponent({
  section,
  sectionIndex,
  openItems,
  onToggle,
}: FAQSectionComponentProps) {
  return (
    <div className="mb-16">
      <h2 className="max-w-[816px] text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 pb-4 border-b-2 border-black">
        {section.title}
      </h2>

      <div className="max-w-[816px]">
        {section.items.map((item, index) => {
          const key = `${sectionIndex}-${index}`;
          return (
            <AccordionItem
              key={key}
              item={item}
              isOpen={openItems.has(key)}
              onToggle={() => onToggle(key)}
              index={index}
              sectionIndex={sectionIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// MAIN FAQ PAGE
// ============================================
export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        // Close other items in the same section (optional: remove for multi-open)
        const sectionIndex = key.split("-")[0];
        next.forEach((k) => {
          if (k.startsWith(sectionIndex + "-")) {
            next.delete(k);
          }
        });
        next.add(key);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 bg-white border-b border-gray-200">
        <div className="py-12 px-6 md:px-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Frequently Asked Questions
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight font-display max-w-4xl">
              Common questions about BVP, the Monk case, and how to get
              involved.
            </h1>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-gray-100">
        <div className="py-12 md:py-16 px-6 md:px-24">
          <div className="max-w-[1400px] mx-auto">
            {faqSections.map((section, index) => (
              <FAQSectionComponent
                key={section.title}
                section={section}
                sectionIndex={index}
                openItems={openItems}
                onToggle={handleToggle}
              />
            ))}

            {/* Contact CTA */}
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-black text-white hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2"
              >
                Have More Questions? Contact Us
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
