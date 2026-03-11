import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// ============================================
// BVP INPUT COMPONENTS
// Bold borders, generous padding
// ============================================

// Text Input
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "dark";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, variant = "default", type = "text", ...props }, ref) => {
    const variants = {
      default: "border-black bg-white text-black placeholder-gray-400",
      dark: "border-white bg-transparent text-white placeholder-gray-400",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold mb-2">{label}</label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full px-4 py-3 md:px-6 md:py-4 border-2 text-base transition-all duration-200",
            "focus:outline-none focus:border-bvp-gold focus:ring-2 focus:ring-bvp-gold/20",
            variants[variant],
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: "default" | "dark";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, variant = "default", ...props }, ref) => {
    const variants = {
      default: "border-black bg-white text-black placeholder-gray-400",
      dark: "border-white bg-transparent text-white placeholder-gray-400",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold mb-2">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 md:px-6 md:py-4 border-2 text-base transition-all duration-200 min-h-[120px] md:min-h-[150px] resize-y",
            "focus:outline-none focus:border-bvp-gold focus:ring-2 focus:ring-bvp-gold/20",
            variants[variant],
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Select - Custom dropdown (not native)
export interface SelectProps {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

function Select({ className, label, error, options, placeholder, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption?.label || placeholder || "Select...";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold mb-2">{label}</label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-3 md:px-6 md:py-4 border-2 border-black bg-white text-base text-left",
            "transition-all duration-200 cursor-pointer",
            "focus:outline-none focus:border-bvp-gold focus:ring-2 focus:ring-bvp-gold/20",
            isOpen && "border-bvp-gold ring-2 ring-bvp-gold/20",
            !value && "text-gray-400",
            error && "border-red-500",
            className
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {displayText}
        </button>

        {/* Dropdown arrow */}
        <svg
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none transition-transform",
            isOpen && "rotate-180"
          )}
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {isOpen && (
          <div
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border-2 border-black shadow-lg max-h-60 overflow-y-auto"
            role="listbox"
          >
            {placeholder && (
              <div
                className={cn(
                  "px-6 py-3 cursor-pointer transition-colors hover:bg-gray-100",
                  !value && "bg-gray-50 font-medium"
                )}
                role="option"
                aria-selected={!value}
                onClick={() => {
                  onChange?.("");
                  setIsOpen(false);
                }}
              >
                {placeholder}
              </div>
            )}
            {options.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  "px-6 py-3 cursor-pointer transition-colors hover:bg-gray-100",
                  value === opt.value && "bg-gray-50 font-medium"
                )}
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export { Input, Textarea, Select };
