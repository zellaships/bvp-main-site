import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div style={{ padding: 'clamp(6rem, 10vw, 6rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 4rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Legal
            </p>
            <h1
              className="font-black leading-tight font-gunterz"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mt-4">
              Version 2026.04.02 | Last updated: April 2, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 5.75rem)' }}>
        <article className="max-w-[800px]">

          {/* Table of Contents */}
          <nav className="mb-12 p-6 bg-gray-50 rounded-lg" aria-label="Table of contents">
            <h2 className="text-lg font-bold mb-4">Contents</h2>
            <ol className="space-y-2 text-sm text-gray-600">
              <li><a href="#data-controller" className="hover:text-black hover:underline">1. Data Controller</a></li>
              <li><a href="#privacy-contact" className="hover:text-black hover:underline">2. Privacy Contact</a></li>
              <li><a href="#data-we-collect" className="hover:text-black hover:underline">3. Data We Collect</a></li>
              <li><a href="#purposes" className="hover:text-black hover:underline">4. How We Use Your Data</a></li>
              <li><a href="#legal-basis" className="hover:text-black hover:underline">5. Legal Basis for Processing</a></li>
              <li><a href="#sensitive-data" className="hover:text-black hover:underline">6. Special Category Data</a></li>
              <li><a href="#third-parties" className="hover:text-black hover:underline">7. Who We Share Your Data With</a></li>
              <li><a href="#international-transfers" className="hover:text-black hover:underline">8. International Data Transfers</a></li>
              <li><a href="#retention" className="hover:text-black hover:underline">9. Data Retention</a></li>
              <li><a href="#your-rights" className="hover:text-black hover:underline">10. Your Rights</a></li>
              <li><a href="#withdraw-consent" className="hover:text-black hover:underline">11. Withdrawing Consent</a></li>
              <li><a href="#complaints" className="hover:text-black hover:underline">12. Right to Complain</a></li>
              <li><a href="#required-data" className="hover:text-black hover:underline">13. Required vs Optional Data</a></li>
              <li><a href="#automated-decisions" className="hover:text-black hover:underline">14. Automated Decision-Making</a></li>
              <li><a href="#children" className="hover:text-black hover:underline">15. Children's Privacy</a></li>
              <li><a href="#cookies" className="hover:text-black hover:underline">16. Cookies & Tracking</a></li>
              <li><a href="#changes" className="hover:text-black hover:underline">17. Changes to This Policy</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">18. Contact Us</a></li>
            </ol>
          </nav>

          {/* 1. Data Controller */}
          <section id="data-controller" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">1. Data Controller</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The data controller responsible for your personal data is:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
              <p className="font-bold">Black Veterans Project, Inc.</p>
              <p>A 501(c)(3) nonprofit organization</p>
              <p className="mt-2">
                P.O. Box 90294<br />
                Washington, DC 20090<br />
                United States
              </p>
              <p className="mt-2">
                <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                  info@blackveteransproject.org
                </a>
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              As data controller, we determine the purposes and means of processing your personal data and are responsible for ensuring your data is handled in compliance with applicable data protection laws.
            </p>
          </section>

          {/* 2. Privacy Contact */}
          <section id="privacy-contact" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">2. Privacy Contact</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              For all privacy-related inquiries, data subject requests, or concerns about how we handle your data, contact our designated privacy contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
              <p className="font-bold">Privacy Team</p>
              <p>Black Veterans Project</p>
              <p className="mt-2">
                Email:{' '}
                <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                  info@blackveteransproject.org
                </a>
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              We aim to respond to all privacy inquiries within 30 days.
            </p>
          </section>

          {/* 3. Data We Collect */}
          <section id="data-we-collect" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">3. Data We Collect</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We collect different categories of personal data depending on how you interact with us:
            </p>

            <h3 className="text-xl font-bold mb-3">3.1 Information You Provide</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Category</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Examples</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">When Collected</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Identity Data</td>
                    <td className="border border-gray-300 p-3">First name, last name</td>
                    <td className="border border-gray-300 p-3">Membership signup, contact forms</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Contact Data</td>
                    <td className="border border-gray-300 p-3">Email address, phone number, mailing address, ZIP code</td>
                    <td className="border border-gray-300 p-3">Membership signup, newsletter, contact forms</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Demographic Data</td>
                    <td className="border border-gray-300 p-3">Race, gender identity</td>
                    <td className="border border-gray-300 p-3">Advocate/Veteran membership forms (optional)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Military Service Data</td>
                    <td className="border border-gray-300 p-3">Branch, service era, pay grade, discharge status, VA claim status</td>
                    <td className="border border-gray-300 p-3">Veteran/Advocate membership forms</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Personal Experiences</td>
                    <td className="border border-gray-300 p-3">Barriers to benefits, personal hardships</td>
                    <td className="border border-gray-300 p-3">Advocate/Veteran membership forms (optional)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Professional Data</td>
                    <td className="border border-gray-300 p-3">Title, affiliation, LinkedIn profile, employment status</td>
                    <td className="border border-gray-300 p-3">Advocate membership forms (optional)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Financial Data</td>
                    <td className="border border-gray-300 p-3">Payment card details (processed by Donately, not stored by us)</td>
                    <td className="border border-gray-300 p-3">Donations</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold mb-3">3.2 Information Collected Automatically</h3>
            <p className="text-gray-700 mb-4">When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Device Data:</strong> Browser type, operating system, device type</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, scroll depth, click patterns</li>
              <li><strong>Location Data:</strong> Country and region (derived from IP address, which we anonymize)</li>
              <li><strong>Referral Data:</strong> How you found us (search engine, social media, email campaign)</li>
            </ul>
            <p className="text-gray-600 text-sm">
              <strong>Important:</strong> We only collect this data after you provide consent via our cookie banner. See <a href="#cookies" className="underline">Section 15: Cookies & Tracking</a>.
            </p>
          </section>

          {/* 4. How We Use Your Data */}
          <section id="purposes" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">4. How We Use Your Data</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We use your personal data for the following purposes:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Membership Management</td>
                    <td className="border border-gray-300 p-3">Registering you as a member, maintaining membership records, segmenting members for relevant communications</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Communications</td>
                    <td className="border border-gray-300 p-3">Sending newsletters, updates on our work, calls to action, event invitations</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Advocacy & Organizing</td>
                    <td className="border border-gray-300 p-3">Coordinating petition drives, call campaigns, town halls, and rapid-response moments</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Legal Resources</td>
                    <td className="border border-gray-300 p-3">Connecting veterans with legal resources, including information about the Monk v. United States case</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Donation Processing</td>
                    <td className="border border-gray-300 p-3">Processing donations, sending tax receipts, donor acknowledgments</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Website Improvement</td>
                    <td className="border border-gray-300 p-3">Analyzing how visitors use our site to improve user experience</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Legal Compliance</td>
                    <td className="border border-gray-300 p-3">Complying with applicable laws and regulations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Legal Basis */}
          <section id="legal-basis" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">5. Legal Basis for Processing</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Under GDPR and similar laws, we must have a legal basis to process your personal data. We rely on the following:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Legal Basis</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">GDPR Article</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">When We Use It</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Consent</td>
                    <td className="border border-gray-300 p-3">Art. 6(1)(a)</td>
                    <td className="border border-gray-300 p-3">Newsletter signup, analytics cookies, marketing emails</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Explicit Consent</td>
                    <td className="border border-gray-300 p-3">Art. 9(2)(a)</td>
                    <td className="border border-gray-300 p-3">Collecting sensitive data (race, military history, health-related barriers)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Legitimate Interests</td>
                    <td className="border border-gray-300 p-3">Art. 6(1)(f)</td>
                    <td className="border border-gray-300 p-3">Responding to contact form inquiries, website security, fraud prevention</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Legal Obligation</td>
                    <td className="border border-gray-300 p-3">Art. 6(1)(c)</td>
                    <td className="border border-gray-300 p-3">Tax record keeping for donations, responding to legal requests</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              <strong>Legitimate Interests Assessment:</strong> Where we rely on legitimate interests, we have conducted a balancing test to ensure our interests do not override your fundamental rights and freedoms. You may contact us to request details of this assessment.
            </p>
          </section>

          {/* 6. Special Category Data */}
          <section id="sensitive-data" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">6. Special Category Data</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Some of the information we collect is considered "special category" data under GDPR Article 9, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><strong>Racial or ethnic origin</strong> (e.g., identifying as a Black veteran)</li>
              <li><strong>Health-related information</strong> (e.g., mental health challenges, addiction, disability status)</li>
              <li><strong>Political opinions</strong> (implied by participation in advocacy activities)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>We only collect this data with your explicit consent.</strong> When you complete our membership forms, you are asked to check a consent box specifically acknowledging that you are sharing sensitive information.
            </p>
            <p className="text-gray-600 text-sm">
              You may withdraw this consent at any time. See <a href="#withdraw-consent" className="underline">Section 11: Withdrawing Consent</a>.
            </p>
          </section>

          {/* 7. Who We Share Data With */}
          <section id="third-parties" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">7. Who We Share Your Data With</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We share your personal data with the following third-party service providers:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Service Provider</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Data Shared</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Location</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">
                      <a href="https://actionnetwork.org/privacy" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                        Action Network
                      </a>
                    </td>
                    <td className="border border-gray-300 p-3">CRM, email marketing, membership management</td>
                    <td className="border border-gray-300 p-3">Name, email, phone, address, membership data, form responses</td>
                    <td className="border border-gray-300 p-3">United States</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">
                      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                        Vercel
                      </a>
                    </td>
                    <td className="border border-gray-300 p-3">Website hosting, analytics, performance monitoring</td>
                    <td className="border border-gray-300 p-3">IP address (anonymized), pages visited, device info</td>
                    <td className="border border-gray-300 p-3">United States (Edge network)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">
                      <a href="https://www.donately.com/privacy" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                        Donately
                      </a>
                    </td>
                    <td className="border border-gray-300 p-3">Donation processing</td>
                    <td className="border border-gray-300 p-3">Name, email, payment information</td>
                    <td className="border border-gray-300 p-3">United States</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">
                      <a href="https://substack.com/privacy" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                        Substack
                      </a>
                    </td>
                    <td className="border border-gray-300 p-3">Newsletter publishing and distribution</td>
                    <td className="border border-gray-300 p-3">Email address</td>
                    <td className="border border-gray-300 p-3">United States</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              We require all third-party processors to respect the security of your personal data and treat it in accordance with applicable law. We do not allow them to use your data for their own purposes; they may only process your data for specified purposes and in accordance with our instructions.
            </p>
          </section>

          {/* 8. International Transfers */}
          <section id="international-transfers" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">8. International Data Transfers</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Black Veterans Project is based in the United States. If you are accessing our website from the European Union, United Kingdom, or other regions with data protection laws, please be aware that your data will be transferred to, stored, and processed in the United States.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Transfer Mechanisms:</strong> For transfers of personal data from the EU/UK to the US, we rely on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Your explicit consent (provided when you submit forms)</li>
              <li>Standard Contractual Clauses (SCCs) where applicable with our service providers</li>
            </ul>
            <p className="text-gray-600 text-sm">
              You may contact us for more information about the specific safeguards we have in place for international data transfers.
            </p>
          </section>

          {/* 9. Data Retention */}
          <section id="retention" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">9. Data Retention</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Data Type</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Retention Period</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Rationale</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Membership data</td>
                    <td className="border border-gray-300 p-3">Duration of membership + 3 years</td>
                    <td className="border border-gray-300 p-3">Maintain relationship, comply with legal obligations</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Newsletter subscribers</td>
                    <td className="border border-gray-300 p-3">Until unsubscribe + 30 days</td>
                    <td className="border border-gray-300 p-3">Allow time to process unsubscribe request</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Donation records</td>
                    <td className="border border-gray-300 p-3">7 years</td>
                    <td className="border border-gray-300 p-3">IRS tax record requirements for 501(c)(3)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Contact form submissions</td>
                    <td className="border border-gray-300 p-3">2 years</td>
                    <td className="border border-gray-300 p-3">Follow-up and relationship building</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Analytics data</td>
                    <td className="border border-gray-300 p-3">26 months</td>
                    <td className="border border-gray-300 p-3">Website improvement analysis</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Consent records</td>
                    <td className="border border-gray-300 p-3">Duration of consent + 5 years</td>
                    <td className="border border-gray-300 p-3">Demonstrate compliance with GDPR</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          {/* 10. Your Rights */}
          <section id="your-rights" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">10. Your Rights</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Depending on your location, you have the following rights regarding your personal data:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Access (GDPR Art. 15)</h3>
                <p className="text-gray-700 text-sm">Request a copy of all personal data we hold about you.</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Rectification (GDPR Art. 16)</h3>
                <p className="text-gray-700 text-sm">Request correction of inaccurate or incomplete data.</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Erasure (GDPR Art. 17)</h3>
                <p className="text-gray-700 text-sm">Request deletion of your personal data ("right to be forgotten").</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Restrict Processing (GDPR Art. 18)</h3>
                <p className="text-gray-700 text-sm">Request that we limit how we use your data.</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Data Portability (GDPR Art. 20)</h3>
                <p className="text-gray-700 text-sm">Request your data in a structured, machine-readable format.</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Object (GDPR Art. 21)</h3>
                <p className="text-gray-700 text-sm">Object to processing based on legitimate interests or for direct marketing.</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Withdraw Consent (GDPR Art. 7)</h3>
                <p className="text-gray-700 text-sm">Withdraw consent at any time where processing is based on consent.</p>
              </div>
              <div className="border-l-4 border-bvp-gold pl-4">
                <h3 className="font-bold text-gray-900">Right to Lodge a Complaint</h3>
                <p className="text-gray-700 text-sm">Complain to a supervisory authority if you believe we've violated your rights.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <p className="font-bold text-gray-900 mb-2">To Exercise Your Rights:</p>
              <p className="text-gray-700 mb-4">
                Email{' '}
                <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                  info@blackveteransproject.org
                </a>{' '}
                with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Subject line:</strong> "Data Request - [Your Request Type]" (e.g., "Data Request - Access" or "Data Request - Deletion")</li>
                <li><strong>Your name and email address</strong> so we can locate your records</li>
                <li><strong>What you're requesting:</strong> access, correction, deletion, data export, etc.</li>
                <li><strong>Any relevant details</strong> to help us process your request</li>
              </ul>
              <p className="text-gray-700 bg-gray-100 p-3 rounded-lg">
                <strong>Response time:</strong> We'll acknowledge your request within 7 days and provide a full response within 30 days. No account or portal needed—just send us an email.
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              <strong>California Residents:</strong> Under CCPA/CPRA, you also have the right to know what personal information we've collected, request deletion, and opt out of "sales" of personal information (we do not sell your data).
            </p>
          </section>

          {/* 11. Withdrawing Consent */}
          <section id="withdraw-consent" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">11. Withdrawing Consent</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Where we process your data based on consent, you have the right to withdraw that consent at any time. Here's how:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-4">
              <li>
                <strong>Cookie Consent:</strong> Click "Cookie Settings" in the website footer to change your preferences.
              </li>
              <li>
                <strong>Newsletter/Email:</strong> Click "Unsubscribe" at the bottom of any email we send.
              </li>
              <li>
                <strong>Membership/Form Data:</strong> Email{' '}
                <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                  info@blackveteransproject.org
                </a>{' '}
                with "Withdraw Consent" in the subject line.
              </li>
            </ul>
            <p className="text-gray-600 text-sm">
              <strong>Note:</strong> Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal. Some data may need to be retained for legal compliance (e.g., donation records for tax purposes).
            </p>
          </section>

          {/* 12. Right to Complain */}
          <section id="complaints" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">12. Right to Complain</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              If you believe we have not handled your personal data properly, you have the right to lodge a complaint with a supervisory authority:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">European Union</h3>
                <p className="text-gray-700 text-sm">
                  Contact your local Data Protection Authority or visit the{' '}
                  <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                    European Data Protection Board
                  </a>{' '}
                  for a list of EU supervisory authorities.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">United Kingdom</h3>
                <p className="text-gray-700 text-sm">
                  <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                    Information Commissioner's Office (ICO)
                  </a>
                  <br />
                  Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF
                  <br />
                  Tel: +44 303 123 1113
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">California (USA)</h3>
                <p className="text-gray-700 text-sm">
                  <a href="https://oag.ca.gov/contact/consumer-complaint-against-business-or-company" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-bvp-gold">
                    California Attorney General
                  </a>
                  <br />
                  Office of the Attorney General, 1300 I Street, Sacramento, CA 95814
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              We encourage you to contact us first at{' '}
              <a href="mailto:info@blackveteransproject.org" className="underline">info@blackveteransproject.org</a>{' '}
              so we can try to resolve your concern directly.
            </p>
          </section>

          {/* 13. Required vs Optional Data */}
          <section id="required-data" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">13. Required vs Optional Data</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When you interact with us, some information is required and some is optional:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Required fields</strong> (marked with *) are necessary to provide the service you're requesting (e.g., email for newsletter signup).
              </li>
              <li>
                <strong>Optional fields</strong> help us better serve you but are not required.
              </li>
            </ul>
            <p className="text-gray-700">
              You are not legally or contractually obligated to provide personal data. However, if you do not provide required information, we may not be able to provide certain services (e.g., membership registration without an email address).
            </p>
          </section>

          {/* 14. Automated Decision-Making */}
          <section id="automated-decisions" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">14. Automated Decision-Making</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We do not use automated decision-making or profiling that produces legal effects or similarly significant effects on you. All significant decisions about your membership or participation in our programs are made by humans.
            </p>
          </section>

          {/* 15. Children's Privacy */}
          <section id="children" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">15. Children's Privacy</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our website and services are not directed at children under the age of 16 (or 13 in jurisdictions where COPPA applies). We do not knowingly collect personal data from children.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-2"><strong>Age Requirements:</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>European Union (GDPR):</strong> We do not knowingly process data of individuals under 16 years of age</li>
                <li><strong>United States (COPPA):</strong> We do not knowingly collect data from children under 13</li>
                <li><strong>United Kingdom:</strong> We do not knowingly process data of individuals under 13 years of age</li>
              </ul>
            </div>
            <p className="text-gray-700 mb-4">
              If we learn that we have inadvertently collected personal data from a child under the applicable age, we will take steps to delete that information as quickly as possible.
            </p>
            <p className="text-gray-700">
              If you are a parent or guardian and believe your child has provided us with personal data, please contact us at{' '}
              <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                info@blackveteransproject.org
              </a>{' '}
              so we can take appropriate action.
            </p>
          </section>

          {/* 16. Cookies & Tracking */}
          <section id="cookies" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">16. Cookies & Tracking</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We use cookies and similar tracking technologies on our website. You can manage your preferences via our cookie banner.
            </p>

            <h3 className="text-xl font-bold mb-3">Cookie Categories</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Category</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Default</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Necessary</td>
                    <td className="border border-gray-300 p-3">Essential for website functionality, security, consent preferences</td>
                    <td className="border border-gray-300 p-3">Always on</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Analytics</td>
                    <td className="border border-gray-300 p-3">Understanding how visitors use our site (page views, scroll depth, etc.)</td>
                    <td className="border border-gray-300 p-3">Off (opt-in)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Marketing</td>
                    <td className="border border-gray-300 p-3">Campaign tracking (UTM parameters)</td>
                    <td className="border border-gray-300 p-3">Off (opt-in)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold mb-3">Specific Cookies We Use</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Cookie Name</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Provider</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3 font-mono text-xs">bvp-cookie-consent</td>
                    <td className="border border-gray-300 p-3">BVP (First-party)</td>
                    <td className="border border-gray-300 p-3">Stores your cookie preferences</td>
                    <td className="border border-gray-300 p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-mono text-xs">va_*</td>
                    <td className="border border-gray-300 p-3">Vercel Analytics</td>
                    <td className="border border-gray-300 p-3">Website analytics (if consented)</td>
                    <td className="border border-gray-300 p-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              <strong>To manage cookies:</strong> Click "Cookie Settings" in the footer at any time, or adjust settings in your browser. Note that disabling certain cookies may impact website functionality.
            </p>
          </section>

          {/* 17. Changes to This Policy */}
          <section id="changes" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">17. Changes to This Policy</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. When we make material changes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>We will update the "Last updated" date at the top of this page</li>
              <li>We will update the version number</li>
              <li>For significant changes, we may notify you by email or website notice</li>
              <li>Where required by law, we will obtain your consent to material changes</li>
            </ul>
            <p className="text-gray-700">
              We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 18. Contact Us */}
          <section id="contact" className="mb-12 scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4 font-gunterz">18. Contact Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">Black Veterans Project</p>
              <p className="text-gray-700 mb-4">Privacy Team</p>
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                  info@blackveteransproject.org
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>General Inquiries:</strong>{' '}
                <a href="mailto:info@blackveteransproject.org" className="text-black underline hover:text-bvp-gold">
                  info@blackveteransproject.org
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-500">
              This Privacy Policy is provided for informational purposes and does not create any contractual or legal rights. Black Veterans Project reserves the right to interpret this policy and make decisions regarding data processing in its sole discretion, consistent with applicable law.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Version 2026.04.02 | © {new Date().getFullYear()} Black Veterans Project, Inc.
            </p>
          </footer>

        </article>
      </section>
    </div>
  );
}
