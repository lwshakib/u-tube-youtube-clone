"use client";

import { AnimatePresence, motion } from "framer-motion";

type FilterChipsProps = {
  chips: string[];
  activeChip: string;
  onSelect: (chip: string) => void;
};

const FilterChips = ({ chips, activeChip, onSelect }: FilterChipsProps) => (
  <div className="no-scrollbar flex items-center gap-3 overflow-x-auto py-3">
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
);

export default FilterChips;


