"use client";

import { cn } from "@/lib/utils";

// ============================================
// BVP BUTTON SHOWCASE - Stacked Layout
// Light bg left, Dark bg right
// ============================================

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="py-12 px-8 bg-black border-b-4 border-[#FDC500]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Button Styles
        </h1>
        <p className="text-gray-400 text-lg">
          Compare on light and dark backgrounds. Hover and click to see interactions.
        </p>
      </div>

      {/* ============================================ */}
      {/* COMBO B - GOLD PILL WITH OUTLINE HOVER */}
      {/* ============================================ */}
      <StyleSection title="Combo B — Gold Pill">
        <SideBySide>
          <LightColumn>
            <ButtonPillOutlineHoverLight>Donate</ButtonPillOutlineHoverLight>
            <ButtonPillOutlineHoverLight>Join Us</ButtonPillOutlineHoverLight>
            <ButtonPillOutlineHoverLight size="sm">Learn More</ButtonPillOutlineHoverLight>
            <ButtonArrowSlide variant="light">Learn More</ButtonArrowSlide>
          </LightColumn>
          <DarkColumn>
            <ButtonPillOutlineHover>Donate</ButtonPillOutlineHover>
            <ButtonPillOutlineHover>Join Us</ButtonPillOutlineHover>
            <ButtonPillOutlineHover size="sm">Learn More</ButtonPillOutlineHover>
            <ButtonArrowSlide variant="dark">Learn More</ButtonArrowSlide>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* GLASSY BUTTONS */}
      {/* ============================================ */}
      <StyleSection title="Glassy — Gold">
        <SideBySide>
          <LightColumn>
            <ButtonGlassyGoldLight>Donate</ButtonGlassyGoldLight>
            <ButtonGlassyGoldLight>Join Us</ButtonGlassyGoldLight>
            <ButtonGlassyGoldLight size="sm">Learn More</ButtonGlassyGoldLight>
          </LightColumn>
          <DarkColumn>
            <ButtonGlassyGold>Donate</ButtonGlassyGold>
            <ButtonGlassyGold>Join Us</ButtonGlassyGold>
            <ButtonGlassyGold size="sm">Learn More</ButtonGlassyGold>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Glassy — Dark/Frosted">
        <SideBySide>
          <LightColumn>
            <ButtonGlassyBlackLight>Donate</ButtonGlassyBlackLight>
            <ButtonGlassyBlackLight>Join Us</ButtonGlassyBlackLight>
            <ButtonGlassyBlackLight size="sm">Learn More</ButtonGlassyBlackLight>
          </LightColumn>
          <DarkColumn>
            <ButtonGlassyDark>Donate</ButtonGlassyDark>
            <ButtonGlassyFrosted>Join Us</ButtonGlassyFrosted>
            <ButtonGlassyDark size="sm">Learn More</ButtonGlassyDark>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* GHOST FILL OPTIONS */}
      {/* ============================================ */}
      <StyleSection title="Ghost Fill — Center Out">
        <SideBySide>
          <LightColumn>
            <ButtonGhostFillCenter variant="light">Donate</ButtonGhostFillCenter>
            <ButtonGhostFillCenter variant="light">Join Us</ButtonGhostFillCenter>
            <ButtonGhostFillCenter variant="light" size="sm">Learn More</ButtonGhostFillCenter>
          </LightColumn>
          <DarkColumn>
            <ButtonGhostFillCenter variant="dark">Donate</ButtonGhostFillCenter>
            <ButtonGhostFillCenter variant="dark">Join Us</ButtonGhostFillCenter>
            <ButtonGhostFillCenter variant="dark" size="sm">Learn More</ButtonGhostFillCenter>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Ghost Fill — Bottom Up">
        <SideBySide>
          <LightColumn>
            <ButtonGhostFillBottom variant="light">Donate</ButtonGhostFillBottom>
            <ButtonGhostFillBottom variant="light">Join Us</ButtonGhostFillBottom>
            <ButtonGhostFillBottom variant="light" size="sm">Learn More</ButtonGhostFillBottom>
          </LightColumn>
          <DarkColumn>
            <ButtonGhostFillBottom variant="dark">Donate</ButtonGhostFillBottom>
            <ButtonGhostFillBottom variant="dark">Join Us</ButtonGhostFillBottom>
            <ButtonGhostFillBottom variant="dark" size="sm">Learn More</ButtonGhostFillBottom>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Ghost Fill — Fade">
        <SideBySide>
          <LightColumn>
            <ButtonGhostFillFade variant="light">Donate</ButtonGhostFillFade>
            <ButtonGhostFillFade variant="light">Join Us</ButtonGhostFillFade>
            <ButtonGhostFillFade variant="light" size="sm">Learn More</ButtonGhostFillFade>
          </LightColumn>
          <DarkColumn>
            <ButtonGhostFillFade variant="dark">Donate</ButtonGhostFillFade>
            <ButtonGhostFillFade variant="dark">Join Us</ButtonGhostFillFade>
            <ButtonGhostFillFade variant="dark" size="sm">Learn More</ButtonGhostFillFade>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* SPLIT ACTION */}
      {/* ============================================ */}
      <StyleSection title="Split Action — Arrow Extends">
        <SideBySide>
          <LightColumn>
            <ButtonSplitExtend variant="light">Donate</ButtonSplitExtend>
            <ButtonSplitExtend variant="light">Join Us</ButtonSplitExtend>
            <ButtonSplitExtend variant="light" size="sm">Learn More</ButtonSplitExtend>
          </LightColumn>
          <DarkColumn>
            <ButtonSplitExtend variant="dark">Donate</ButtonSplitExtend>
            <ButtonSplitExtend variant="dark">Join Us</ButtonSplitExtend>
            <ButtonSplitExtend variant="dark" size="sm">Learn More</ButtonSplitExtend>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* PILLS - ROUNDNESS OPTIONS */}
      {/* ============================================ */}
      <StyleSection title="Pill — Full Round">
        <SideBySide>
          <LightColumn>
            <ButtonPill variant="gold" roundness="full">Donate</ButtonPill>
            <ButtonPill variant="black" roundness="full">Join Us</ButtonPill>
            <ButtonPill variant="outlineBlack" roundness="full">Learn More</ButtonPill>
          </LightColumn>
          <DarkColumn>
            <ButtonPill variant="gold" roundness="full">Donate</ButtonPill>
            <ButtonPill variant="white" roundness="full">Join Us</ButtonPill>
            <ButtonPill variant="outline" roundness="full">Learn More</ButtonPill>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Pill — Large Radius">
        <SideBySide>
          <LightColumn>
            <ButtonPill variant="gold" roundness="lg">Donate</ButtonPill>
            <ButtonPill variant="black" roundness="lg">Join Us</ButtonPill>
            <ButtonPill variant="outlineBlack" roundness="lg">Learn More</ButtonPill>
          </LightColumn>
          <DarkColumn>
            <ButtonPill variant="gold" roundness="lg">Donate</ButtonPill>
            <ButtonPill variant="white" roundness="lg">Join Us</ButtonPill>
            <ButtonPill variant="outline" roundness="lg">Learn More</ButtonPill>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Pill — Medium Radius">
        <SideBySide>
          <LightColumn>
            <ButtonPill variant="gold" roundness="md">Donate</ButtonPill>
            <ButtonPill variant="black" roundness="md">Join Us</ButtonPill>
            <ButtonPill variant="outlineBlack" roundness="md">Learn More</ButtonPill>
          </LightColumn>
          <DarkColumn>
            <ButtonPill variant="gold" roundness="md">Donate</ButtonPill>
            <ButtonPill variant="white" roundness="md">Join Us</ButtonPill>
            <ButtonPill variant="outline" roundness="md">Learn More</ButtonPill>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* SOLID COLOR OPTIONS */}
      {/* ============================================ */}
      <StyleSection title="Solid — Gold">
        <SideBySide>
          <LightColumn>
            <ButtonSolidGold>Donate</ButtonSolidGold>
            <ButtonSolidGold>Join Us</ButtonSolidGold>
            <ButtonSolidGold size="sm">Learn More</ButtonSolidGold>
          </LightColumn>
          <DarkColumn>
            <ButtonSolidGold>Donate</ButtonSolidGold>
            <ButtonSolidGold>Join Us</ButtonSolidGold>
            <ButtonSolidGold size="sm">Learn More</ButtonSolidGold>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Solid — Navy">
        <SideBySide>
          <LightColumn>
            <ButtonSolidNavy>Donate</ButtonSolidNavy>
            <ButtonSolidNavy>Join Us</ButtonSolidNavy>
            <ButtonSolidNavy size="sm">Learn More</ButtonSolidNavy>
          </LightColumn>
          <DarkColumn>
            <ButtonSolidNavy>Donate</ButtonSolidNavy>
            <ButtonSolidNavy>Join Us</ButtonSolidNavy>
            <ButtonSolidNavy size="sm">Learn More</ButtonSolidNavy>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      <StyleSection title="Solid — Black + Gold Border">
        <SideBySide>
          <LightColumn>
            <ButtonBlackGold>Donate</ButtonBlackGold>
            <ButtonBlackGold>Join Us</ButtonBlackGold>
            <ButtonBlackGold size="sm">Learn More</ButtonBlackGold>
          </LightColumn>
          <DarkColumn>
            <ButtonBlackGold>Donate</ButtonBlackGold>
            <ButtonBlackGold>Join Us</ButtonBlackGold>
            <ButtonBlackGold size="sm">Learn More</ButtonBlackGold>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* ARROW SLIDE */}
      {/* ============================================ */}
      <StyleSection title="Arrow Slide — Text Link">
        <SideBySide>
          <LightColumn>
            <ButtonArrowSlide variant="light" size="lg">Donate Now</ButtonArrowSlide>
            <ButtonArrowSlide variant="light">Join Us</ButtonArrowSlide>
            <ButtonArrowSlide variant="light" size="sm">Learn More</ButtonArrowSlide>
          </LightColumn>
          <DarkColumn>
            <ButtonArrowSlide variant="dark" size="lg">Donate Now</ButtonArrowSlide>
            <ButtonArrowSlide variant="dark">Join Us</ButtonArrowSlide>
            <ButtonArrowSlide variant="dark" size="sm">Learn More</ButtonArrowSlide>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

      {/* ============================================ */}
      {/* CLICK EFFECTS */}
      {/* ============================================ */}
      <StyleSection title="Click Effects — Compare (hold to see)">
        <SideBySide>
          <LightColumn>
            <ButtonClickScaleLight>Scale Down</ButtonClickScaleLight>
            <ButtonClickPushDownLight>Push Down</ButtonClickPushDownLight>
            <ButtonClickSquishLight>Squish</ButtonClickSquishLight>
            <ButtonClickTightenLight>Tighten</ButtonClickTightenLight>
          </LightColumn>
          <DarkColumn>
            <ButtonClickScale>Scale Down</ButtonClickScale>
            <ButtonClickPushDown>Push Down</ButtonClickPushDown>
            <ButtonClickSquish>Squish</ButtonClickSquish>
            <ButtonClickTighten>Tighten</ButtonClickTighten>
          </DarkColumn>
        </SideBySide>
      </StyleSection>

    </div>
  );
}

// ============================================
// LAYOUT COMPONENTS
// ============================================

function StyleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-300">
      <div className="py-4 px-6 bg-gray-200">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-600">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SideBySide({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 min-h-[400px]">
      {children}
    </div>
  );
}

function LightColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-[#FEF7E0] to-white p-8 flex flex-col items-center justify-center gap-4">
      {children}
    </div>
  );
}

function DarkColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-[#1a1a1a] to-black p-8 flex flex-col items-center justify-center gap-4">
      {children}
    </div>
  );
}

// ============================================
// BUTTON COMPONENTS
// ============================================

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "dark" | "light";

const sizes = {
  sm: "px-5 py-2.5 text-base",
  md: "px-8 py-4 text-lg",
  lg: "px-10 py-5 text-xl",
};

// COMBO B - Gold Pill with Outline Hover (font size +2-3)
function ButtonPillOutlineHover({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  const pillSizes = { sm: "px-6 py-2.5 text-base", md: "px-10 py-4 text-lg", lg: "px-12 py-5 text-xl" };
  return (
    <button className={cn(pillSizes[size], "font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500] active:scale-95")}>
      {children}
    </button>
  );
}

function ButtonPillOutlineHoverLight({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  const pillSizes = { sm: "px-6 py-2.5 text-base", md: "px-10 py-4 text-lg", lg: "px-12 py-5 text-xl" };
  return (
    <button className={cn(pillSizes[size], "font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-white active:scale-95")}>
      {children}
    </button>
  );
}

// GHOST FILL - Center Out
function ButtonGhostFillCenter({ children, size = "md", variant = "dark" }: { children: React.ReactNode; size?: ButtonSize; variant?: ButtonVariant }) {
  const variantStyles = {
    dark: "text-white border-white hover:text-black hover:border-[#FDC500]",
    light: "text-black border-black hover:text-black hover:border-[#FDC500]",
  };
  return (
    <button className={cn(sizes[size], "relative font-bold tracking-wide overflow-hidden bg-transparent border-4", variantStyles[variant], "transition-all duration-300 active:scale-95 group")}>
      <span className="absolute inset-0 bg-[#FDC500] scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// GHOST FILL - Bottom Up
function ButtonGhostFillBottom({ children, size = "md", variant = "dark" }: { children: React.ReactNode; size?: ButtonSize; variant?: ButtonVariant }) {
  const variantStyles = {
    dark: "text-white border-white hover:text-black hover:border-[#FDC500]",
    light: "text-black border-black hover:text-black hover:border-[#FDC500]",
  };
  return (
    <button className={cn(sizes[size], "relative font-bold tracking-wide overflow-hidden bg-transparent border-4", variantStyles[variant], "transition-all duration-300 active:scale-95 group")}>
      <span className="absolute inset-0 bg-[#FDC500] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// GHOST FILL - Fade
function ButtonGhostFillFade({ children, size = "md", variant = "dark" }: { children: React.ReactNode; size?: ButtonSize; variant?: ButtonVariant }) {
  const variantStyles = {
    dark: "text-white border-white hover:text-black hover:border-[#FDC500] hover:bg-[#FDC500]",
    light: "text-black border-black hover:text-black hover:border-[#FDC500] hover:bg-[#FDC500]",
  };
  return (
    <button className={cn(sizes[size], "font-bold tracking-wide bg-transparent border-4", variantStyles[variant], "transition-all duration-300 active:scale-95")}>
      {children}
    </button>
  );
}

// ARROW SLIDE
function ButtonArrowSlide({ children, size = "md", variant = "dark" }: { children: React.ReactNode; size?: ButtonSize; variant?: ButtonVariant }) {
  const textSizes = { sm: "text-base", md: "text-lg", lg: "text-xl" };
  const variantStyles = { dark: "text-white hover:text-[#FDC500]", light: "text-black hover:text-[#FDC500]" };
  const underlineColor = { dark: "bg-[#FDC500]", light: "bg-black" };
  return (
    <button className={cn(textSizes[size], "relative font-bold tracking-wide", variantStyles[variant], "transition-all duration-300 active:scale-95 group flex items-center gap-3")}>
      <span>{children}</span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
      <span className={cn("absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300", underlineColor[variant])} />
    </button>
  );
}

// SPLIT - Arrow Extends
function ButtonSplitExtend({ children, size = "md", variant = "dark" }: { children: React.ReactNode; size?: ButtonSize; variant?: ButtonVariant }) {
  const iconSizes = { sm: "w-10 group-hover:w-14", md: "w-12 group-hover:w-20", lg: "w-14 group-hover:w-24" };
  const paddingSizes = { sm: "pl-5 pr-0 py-0", md: "pl-8 pr-0 py-0", lg: "pl-10 pr-0 py-0" };
  const textPadding = { sm: "py-2.5", md: "py-4", lg: "py-5" };
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-lg" };
  const variantStyles = {
    dark: { main: "bg-[#FDC500] text-black", icon: "bg-black text-[#FDC500]" },
    light: { main: "bg-black text-white", icon: "bg-[#FDC500] text-black" },
  };
  return (
    <button className={cn(paddingSizes[size], "font-bold tracking-wide", variantStyles[variant].main, "flex items-center transition-all duration-300 active:scale-95 group")}>
      <span className={cn(textSizes[size], textPadding[size])}>{children}</span>
      <span className={cn("h-full flex items-center justify-center", variantStyles[variant].icon, "ml-4", textPadding[size], iconSizes[size], "transition-all duration-300")}>
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </button>
  );
}

// PILLS
type PillVariant = "gold" | "white" | "black" | "outline" | "outlineBlack";
type PillRoundness = "full" | "lg" | "md";

function ButtonPill({ children, size = "md", variant = "gold", roundness = "full" }: { children: React.ReactNode; size?: ButtonSize; variant?: PillVariant; roundness?: PillRoundness }) {
  const pillSizes = { sm: "px-6 py-2.5 text-base", md: "px-10 py-4 text-lg", lg: "px-12 py-5 text-xl" };
  const roundnessStyles = { full: "rounded-full", lg: "rounded-2xl", md: "rounded-lg" };
  const variants = {
    gold: "bg-[#FDC500] text-black border-[#FDC500] hover:bg-black hover:text-[#FDC500] hover:border-black",
    white: "bg-white text-black border-white hover:bg-[#FDC500] hover:border-[#FDC500]",
    black: "bg-black text-white border-black hover:bg-[#FDC500] hover:text-black hover:border-[#FDC500]",
    outline: "bg-transparent text-white border-white hover:bg-white hover:text-black",
    outlineBlack: "bg-transparent text-black border-black hover:bg-black hover:text-white",
  };
  return (
    <button className={cn(pillSizes[size], roundnessStyles[roundness], "font-bold tracking-wide border-4", variants[variant], "transition-all duration-300 active:scale-95")}>
      {children}
    </button>
  );
}

// SOLID COLORS
function ButtonSolidGold({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <button className={cn(sizes[size], "font-bold tracking-wide bg-[#FDC500] text-black border-4 border-[#FDC500] transition-all duration-300 hover:bg-black hover:text-[#FDC500] hover:border-black active:scale-95")}>
      {children}
    </button>
  );
}

function ButtonSolidNavy({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <button className={cn(sizes[size], "font-bold tracking-wide bg-[#232651] text-[#FDC500] border-4 border-[#232651] transition-all duration-300 hover:bg-[#FDC500] hover:text-[#232651] hover:border-[#FDC500] active:scale-95")}>
      {children}
    </button>
  );
}

function ButtonBlackGold({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <button className={cn(sizes[size], "font-bold tracking-wide bg-black text-white border-4 border-[#FDC500] transition-all duration-300 hover:bg-[#FDC500] hover:text-black hover:border-[#FDC500] active:scale-95")}>
      {children}
    </button>
  );
}

// GLASSY BUTTONS - Animated light sweep bevel
const glassySizes = { sm: "px-6 py-3 text-base", md: "px-10 py-5 text-lg", lg: "px-14 py-6 text-xl" };

// CSS for the rotating light animation - inject into page
const glassyStyles = `
@keyframes lightSweep {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

function ButtonGlassyGold({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <>
      <style>{glassyStyles}</style>
      <button
        className={cn(
          glassySizes[size],
          "font-bold tracking-wide rounded-2xl text-black",
          "transition-all duration-200 active:scale-[0.98]",
          "relative group overflow-hidden"
        )}
        style={{
          background: "linear-gradient(180deg, #FFE066 0%, #FDC500 40%, #D4A600 100%)",
          border: "1px solid rgba(0,0,0,0.2)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.5),
            inset 0 -1px 0 rgba(0,0,0,0.15)
          `,
        }}
      >
        {/* Animated light sweep border */}
        <span
          className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 30deg, transparent 60deg, transparent 360deg)",
            animation: "lightSweep 1.5s linear infinite",
          }}
        />
        {/* Inner background to mask the sweep */}
        <span
          className="absolute inset-[2px] rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #FFE066 0%, #FDC500 40%, #D4A600 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}

function ButtonGlassyGoldLight({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <>
      <style>{glassyStyles}</style>
      <button
        className={cn(
          glassySizes[size],
          "font-bold tracking-wide rounded-2xl text-black",
          "transition-all duration-200 active:scale-[0.98]",
          "relative group overflow-hidden"
        )}
        style={{
          background: "linear-gradient(180deg, #FFE880 0%, #FDC500 40%, #E0AD00 100%)",
          border: "1px solid rgba(0,0,0,0.25)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.6),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Animated light sweep border */}
        <span
          className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,0,0,0.4) 30deg, transparent 60deg, transparent 360deg)",
            animation: "lightSweep 1.5s linear infinite",
          }}
        />
        {/* Inner background to mask the sweep */}
        <span
          className="absolute inset-[2px] rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #FFE880 0%, #FDC500 40%, #E0AD00 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}

function ButtonGlassyFrosted({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <>
      <style>{glassyStyles}</style>
      <button
        className={cn(
          glassySizes[size],
          "font-bold tracking-wide rounded-2xl text-white backdrop-blur-sm",
          "transition-all duration-200 active:scale-[0.98]",
          "relative group overflow-hidden"
        )}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.4),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Animated light sweep border */}
        <span
          className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.8) 30deg, transparent 60deg, transparent 360deg)",
            animation: "lightSweep 1.5s linear infinite",
          }}
        />
        {/* Inner background to mask the sweep */}
        <span
          className="absolute inset-[2px] rounded-xl pointer-events-none backdrop-blur-sm"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}

function ButtonGlassyDark({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <>
      <style>{glassyStyles}</style>
      <button
        className={cn(
          glassySizes[size],
          "font-bold tracking-wide rounded-2xl text-[#FDC500]",
          "transition-all duration-200 active:scale-[0.98]",
          "relative group overflow-hidden"
        )}
        style={{
          background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          border: "1px solid rgba(253,197,0,0.3)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.4)
          `,
        }}
      >
        {/* Animated light sweep border */}
        <span
          className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(253,197,0,0.9) 30deg, transparent 60deg, transparent 360deg)",
            animation: "lightSweep 1.5s linear infinite",
          }}
        />
        {/* Inner background to mask the sweep */}
        <span
          className="absolute inset-[2px] rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}

function ButtonGlassyBlackLight({ children, size = "md" }: { children: React.ReactNode; size?: ButtonSize }) {
  return (
    <>
      <style>{glassyStyles}</style>
      <button
        className={cn(
          glassySizes[size],
          "font-bold tracking-wide rounded-2xl text-white",
          "transition-all duration-200 active:scale-[0.98]",
          "relative group overflow-hidden"
        )}
        style={{
          background: "linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 50%, #0a0a0a 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(0,0,0,0.4)
          `,
        }}
      >
        {/* Animated light sweep border */}
        <span
          className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.7) 30deg, transparent 60deg, transparent 360deg)",
            animation: "lightSweep 1.5s linear infinite",
          }}
        />
        {/* Inner background to mask the sweep */}
        <span
          className="absolute inset-[2px] rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 50%, #0a0a0a 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}

// CLICK EFFECTS
const pillBase = "px-10 py-4 text-lg font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500]";
const pillBaseLight = "px-10 py-4 text-lg font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-white";

function ButtonClickScale({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBase, "active:scale-95")}>{children}</button>;
}
function ButtonClickPushDown({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBase, "active:translate-y-1")}>{children}</button>;
}
function ButtonClickSquish({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBase, "active:scale-x-105 active:scale-y-90")}>{children}</button>;
}
function ButtonClickTighten({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBase, "active:tracking-tighter active:scale-[0.98]")}>{children}</button>;
}
function ButtonClickScaleLight({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBaseLight, "active:scale-95")}>{children}</button>;
}
function ButtonClickPushDownLight({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBaseLight, "active:translate-y-1")}>{children}</button>;
}
function ButtonClickSquishLight({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBaseLight, "active:scale-x-105 active:scale-y-90")}>{children}</button>;
}
function ButtonClickTightenLight({ children }: { children: React.ReactNode }) {
  return <button className={cn(pillBaseLight, "active:tracking-tighter active:scale-[0.98]")}>{children}</button>;
}
