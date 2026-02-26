import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { NewsletterStrip } from "@/components/sections/NewsletterStrip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <NewsletterStrip />
      <Footer />
      <BackToTop />
    </>
  );
}
