"use client";

import { forwardRef, HTMLAttributes, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================
// BVP ACCORDION COMPONENT
// Bold borders, smooth animations
// ============================================

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItemData[];
  allowMultiple?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, items, allowMultiple = false, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
      if (allowMultiple) {
        setOpenItems((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      } else {
        setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
      }
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openItems.includes(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

// Individual Accordion Item
interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-4 border-black bg-white">
      <button
        onClick={onToggle}
        className={cn(
          "w-full px-6 py-5 md:px-8 md:py-6 text-left flex justify-between items-center gap-4",
          "hover:bg-gray-50 transition-colors duration-200"
        )}
        aria-expanded={isOpen}
      >
        <span className="text-lg md:text-xl font-bold pr-4">{item.question}</span>
        <span
          className={cn(
            "text-2xl font-bold flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8 border-t-2 border-black">
              <p className="pt-6 text-base md:text-lg leading-relaxed text-gray-700">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Accordion };
