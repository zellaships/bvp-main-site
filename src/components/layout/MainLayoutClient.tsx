'use client'

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { BackToTop } from "@/components/ui/BackToTop"
import { NewsletterStrip } from "@/components/sections/NewsletterStrip"
import { useNewsletterSettings } from "@/components/providers/SiteDataContext"

// Pages that should not show the newsletter strip
const PAGES_WITHOUT_NEWSLETTER = ['/', '/donate']

interface MainLayoutClientProps {
  children: React.ReactNode
}

export function MainLayoutClient({ children }: MainLayoutClientProps) {
  const pathname = usePathname()
  const showNewsletter = !PAGES_WITHOUT_NEWSLETTER.includes(pathname)
  const newsletterSettings = useNewsletterSettings()

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      {showNewsletter && (
        <NewsletterStrip
          headline={newsletterSettings?.stripHeadline}
          subheadline={newsletterSettings?.stripSubheadline}
        />
      )}
      <Footer />
      <BackToTop />
    </>
  )
}
