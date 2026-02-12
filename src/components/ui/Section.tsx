import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ============================================
// BVP SECTION COMPONENT
// Consistent spacing and container widths
// ============================================

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Background color variant */
  variant?: "white" | "gray" | "black" | "gold" | "navy";
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Whether to include the container */
  container?: boolean;
  /** HTML element to render as */
  as?: "section" | "div" | "article" | "aside";
  children: React.ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = "white",
      padding = "lg",
      container = true,
      as: Component = "section",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      white: "bg-white text-black",
      gray: "bg-gray-100 text-black",
      black: "bg-black text-white",
      gold: "bg-bvp-gold text-black",
      navy: "bg-bvp-navy text-white",
    };

    const paddings = {
      none: "",
      sm: "py-12 md:py-16 px-6 md:px-12",
      md: "py-16 md:py-20 px-6 md:px-12",
      lg: "py-20 md:py-32 px-6 md:px-12",
    };

    return (
      <Component
        // @ts-ignore - ref typing issue with dynamic component
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        {container ? (
          <div className="max-w-container mx-auto">{children}</div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Section.displayName = "Section";

// Section Header - for consistent section titles
export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, label, title, description, centered = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-12 md:mb-16", centered && "text-center", className)}
      {...props}
    >
      {label && (
        <p className="text-label-md font-bold uppercase tracking-widest mb-4 text-gray-500">
          {label}
        </p>
      )}
      <h2 className="text-display-sm md:text-display-md font-bold text-balance">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 text-body-lg text-gray-600 max-w-3xl leading-relaxed",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
);

SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader };
