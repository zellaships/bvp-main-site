'use client';

import Image from 'next/image';
import type { SanityPartner } from '@/sanity/lib/types';

interface PartnersSectionProps {
  partners: SanityPartner[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section
      id="partners"
      className="scroll-mt-20"
      style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 5.75rem)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-gunterz font-bold uppercase text-center"
          style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}
        >
          Our Partners
        </h2>
        <p
          className="text-gray-600 text-center"
          style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          Organizations advancing the work alongside us.
        </p>

        <p
          className="text-center text-gray-800"
          style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
        >
          <span className="font-medium">Yale</span> Law School Jerome N. Franklin Veterans Legal Services Clinic
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-3 items-center justify-items-center"
          style={{ gap: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          {partners.map((partner) => (
            <a
              key={partner._id}
              href={partner.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-28 w-full group"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={280}
                  height={120}
                  className="w-auto object-contain opacity-60 grayscale mix-blend-multiply group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 ease-out"
                  style={{
                    maxHeight: '100px',
                    maxWidth: '220px'
                  }}
                />
              ) : (
                <span className="text-gray-500 font-medium">{partner.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
