"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type FilterChipsProps = {
  chips: string[];
  activeChip: string;
  onSelect: (chip: string) => void;
};

const SCROLL_AMOUNT = 200;

const FilterChips = ({ chips, activeChip, onSelect }: FilterChipsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const delta = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        aria-label="Scroll filters left"
        onClick={() => scroll("left")}
        className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#1f1f1f] text-white/80 transition hover:bg-white/20 lg:flex"
      >
        <ArrowLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto py-3"
      >
        {chips.map((chip) => {
          const isActive = chip === activeChip;

          return (
            <button
              key={chip}
              type="button"
              onClick={() => onSelect(chip)}
              aria-pressed={isActive}
              className="relative flex-shrink-0 rounded-xl border border-white/10 px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="chip-active-pill"
                    className="absolute inset-0 rounded-xl bg-white text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <span className={`relative z-10 ${isActive ? "text-black" : ""}`}>
                {chip}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Scroll filters right"
        onClick={() => scroll("right")}
        className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#1f1f1f] text-white/80 transition hover:bg-white/20 lg:flex"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FilterChips;


