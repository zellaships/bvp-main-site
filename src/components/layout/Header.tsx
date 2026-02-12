"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// ============================================
// BVP HEADER COMPONENT
// Fixed header with dropdown nav (desktop)
// Hamburger menu with slide-out (mobile)
// ============================================

const navigation = [
  {
    name: "About Us",
    href: "/about",
    children: [
      { name: "Mission & Vision", href: "/about#mission" },
      { name: "Founders", href: "/about#founders" },
      { name: "Team", href: "/about#team" },
      { name: "Board", href: "/about#board" },
      { name: "Partners", href: "/about#partners" },
    ],
  },
  {
    name: "Our Work",
    href: "/our-work",
    children: [
      { name: "The Case for Repair", href: "/our-work#case-for-repair" },
      { name: "Impact Litigation", href: "/our-work#litigation" },
      { name: "Narrative Building", href: "/our-work#narrative" },
      { name: "Mobilization", href: "/our-work#mobilization" },
    ],
  },
  { name: "Join Us", href: "/join" },
];

// Dropdown animation variants
const dropdownVariants = {
  hidden: {
    opacity: 1,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.15 }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

// Mobile menu animation variants
const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "tween" as const, duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    x: "100%",
    transition: { type: "tween" as const, duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const mobileNavContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 }
  }
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  // Handle scroll - hide header when scrolling, show at top
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if at top
      setAtTop(currentScrollY < 20);

      // Hide when scrolled down past threshold
      if (currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
          atTop ? "bg-transparent py-6" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-[92px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/BVP-logo.png"
              alt="Black Veterans Project"
              width={132}
              height={66}
              className="h-11 md:h-[52px] w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-5 py-3 text-base font-medium text-white hover:text-bvp-gold transition-colors flex items-center gap-2 group/link",
                    pathname === item.href && "text-bvp-gold"
                  )}
                >
                  {item.name}
                  {item.children ? (
                    <motion.span
                      animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  ) : (
                    <span className="absolute bottom-1.5 left-5 right-5 h-[2px] bg-[#FDC500] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                  )}
                </Link>

                {/* Enhanced Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 pt-3"
                    >
                      {/* Dropdown arrow */}
                      <div className="absolute top-3 left-8 w-3 h-3 bg-white/50 backdrop-blur-md rotate-45 -translate-y-1/2 z-10" />

                      <div className="relative bg-white/50 backdrop-blur-md rounded-lg shadow-xl min-w-[240px] overflow-hidden border border-white/20">
                        {/* Gold accent bar at top */}
                        <div className="h-1 bg-bvp-gold" />

                        <div className="py-2">
                          {item.children.map((child, idx) => (
                            <motion.div key={child.name} variants={itemVariants}>
                              <Link
                                href={child.href}
                                className="group/item relative block px-5 py-3 transition-all duration-200 hover:bg-[#FDC500]"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-base font-medium text-gray-700 group-hover/item:text-black transition-colors duration-200">
                                    {child.name}
                                  </span>

                                  {/* Arrow */}
                                  <svg
                                    className="w-4 h-4 text-gray-300 group-hover/item:text-black group-hover/item:translate-x-1 transition-all duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </Link>

                              {/* Divider */}
                              {idx !== item.children!.length - 1 && (
                                <div className="mx-5 border-b border-gray-100" />
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Donate Button */}
            <Link href="/donate" className="ml-4">
              <Button variant="accent" size="sm">
                Donate
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button — Animated Hamburger ↔ X */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="absolute block h-[2px] w-6 bg-white rounded-full"
              animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            />
            <motion.span
              className="absolute block h-[2px] w-6 bg-white rounded-full"
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute block h-[2px] w-6 bg-white rounded-full"
              animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            />
          </button>
        </div>
      </header>

      {/* Sticky Side Donate — slides in when header hides */}
      <AnimatePresence>
        {hidden && (
          <motion.div
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <Link
              href="/donate"
              className={cn(
                "flex items-center justify-center",
                "bg-[#F44708] text-white font-bold text-sm tracking-widest uppercase",
                "w-[55px] h-[116px] rounded-l-[24px] shadow-lg",
                "hover:bg-white hover:text-[#F44708]",
                "border-2 border-[#F44708] border-r-0",
                "transition-all duration-300 active:scale-95"
              )}
              style={{ writingMode: "vertical-rl" }}
            >
              <span style={{ transform: "rotate(180deg)", display: "block" }}>Donate</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop — blurred */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Menu — Frosted Glass */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white/50 backdrop-blur-md z-50 lg:hidden border-l border-white/20"
            >
              {/* Close Button — Animated X with spin on hover */}
              <div className="flex justify-end p-6">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative w-10 h-10 flex items-center justify-center text-black"
                  aria-label="Close menu"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    className="absolute block h-[2px] w-6 bg-black rounded-full"
                    style={{ rotate: 45 }}
                  />
                  <motion.span
                    className="absolute block h-[2px] w-6 bg-black rounded-full"
                    style={{ rotate: -45 }}
                  />
                </motion.button>
              </div>

              {/* Mobile Nav Links — Staggered entrance */}
              <motion.nav
                className="px-6"
                variants={mobileNavContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    className="border-b border-black/10"
                    variants={mobileNavItemVariants}
                  >
                    <Link
                      href={item.href}
                      className="block py-4 text-xl font-bold text-black hover:text-[#FDC500] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile Dropdown Children */}
                    {item.children && (
                      <div className="pb-4 pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block py-2 text-base text-black/60 hover:text-[#FDC500] transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Donate Button */}
                <motion.div className="mt-8" variants={mobileNavItemVariants}>
                  <Link href="/donate" className="block" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="accent" fullWidth>
                      Donate
                    </Button>
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
