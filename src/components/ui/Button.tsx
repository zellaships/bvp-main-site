import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================
// BVP BUTTON COMPONENT
// Variants: primary (gold), secondary (black), outline, outline-white
// Sizes: sm, md, lg
// Renders as <a> when href provided, <button> otherwise
// ============================================

type BaseButtonProps = {
  variant?: "primary" | "primary-light" | "secondary" | "outline" | "outline-white" | "white" | "accent";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
};

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// Base styles - Combo B Gold Pill style
const baseStyles =
  "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 border-2 rounded-full active:scale-95";

// Variant styles - Gold border stays on hover
const variants = {
  primary:
    "bg-[#FDC500] text-black border-[#FDC500] hover:bg-black hover:text-[#FDC500]",
  "primary-light":
    "bg-[#FDC500] text-black border-[#FDC500] hover:bg-white",
  secondary:
    "bg-black text-white border-black hover:bg-[#FDC500] hover:text-black hover:border-[#FDC500]",
  outline:
    "bg-transparent text-black border-black hover:bg-black hover:text-white",
  "outline-white":
    "bg-transparent text-white border-[#FDC500] hover:bg-[#FDC500] hover:text-black",
  white:
    "bg-white text-black border-white hover:bg-black hover:text-white",
  accent:
    "bg-[#F44708] text-white border-[#F44708] hover:bg-white hover:text-[#F44708] hover:border-white",
};

// Size styles - Font sizes increased
const sizes = {
  sm: "px-6 py-2.5 text-base",
  md: "px-8 py-3 text-lg",
  lg: "px-10 py-4 text-xl",
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      ...rest
    } = props;

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    );

    // If href is provided, render as Link
    if ("href" in props && props.href) {
      const { href, ...linkProps } = rest as Omit<ButtonAsLink, keyof BaseButtonProps>;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    // Otherwise render as button
    const buttonProps = rest as Omit<ButtonAsButton, keyof BaseButtonProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
