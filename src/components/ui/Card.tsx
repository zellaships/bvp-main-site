import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ============================================
// BVP CARD COMPONENT
// Bold borders, chunky padding, optional hover effect
// ============================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "gold" | "navy";
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hoverable = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-white border-black",
      dark: "bg-black border-black text-white",
      gold: "bg-bvp-gold border-bvp-gold text-black",
      navy: "bg-bvp-navy border-bvp-navy text-white",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6 md:p-8",
      lg: "p-8 md:p-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border-4",
          variants[variant],
          paddings[padding],
          hoverable && "transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header component
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

// Card Content component
const CardContent = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

// Card Footer component
const CardFooter = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("mt-6", className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
