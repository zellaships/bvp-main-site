import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
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
            "w-full px-6 py-4 border-2 text-base transition-all duration-200",
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
            "w-full px-6 py-4 border-2 text-base transition-all duration-200 min-h-[150px] resize-y",
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

// Select
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold mb-2">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full px-6 py-4 border-2 border-black bg-white text-base",
            "transition-all duration-200 cursor-pointer appearance-none",
            "focus:outline-none focus:border-bvp-gold focus:ring-2 focus:ring-bvp-gold/20",
            "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]",
            "bg-[length:12px] bg-[right_1rem_center] bg-no-repeat",
            error && "border-red-500",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
