"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";

export default function Projects({ data }: { data: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!data || data.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return data.length - 1;
      if (nextIndex >= data.length) return 0;
      return nextIndex;
    });
  };

  const getCardIndex = (offset: number) => {
    const index = current + offset;
    if (index < 0) return data.length - 1;
    if (index >= data.length) return 0;
    return index;
  };

  return (
    <section id="projects" className="scroll-mt-24 overflow-hidden w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-brand-accent">
          Featured Projects
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-zinc-800 bg-brand-card hover:text-brand-accent transition-colors cursor-pointer z-10"
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            onClick={() => navigate(1)}
            className="p-2 rounded-lg border border-zinc-800 bg-brand-card hover:text-brand-accent transition-colors cursor-pointer z-10"
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center h-75 w-full px-12 md:px-24">
        {/* Left Side Peek Card */}
        <div className="absolute left-[-40%] md:left-[-15%] w-[50%] md:w-[35%] h-60 opacity-20 pointer-events-none scale-90 bg-brand-card p-6 rounded-xl border border-zinc-800/80 blur-[1px] hidden sm:flex flex-col justify-between select-none">
          <div>
            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              {data[getCardIndex(-1)].type}
            </span>
            <h3 className="text-base font-bold text-zinc-500 mt-1 line-clamp-1">
              {data[getCardIndex(-1)].title}
            </h3>
          </div>
        </div>

        {/* Center Active Track */}
        <div className="relative w-full h-full overflow-visible flex justify-center items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 26 },
                opacity: { duration: 0.25 },
              }}
              className="absolute w-full h-full bg-brand-card p-6 rounded-xl border border-zinc-800 shadow-2xl flex flex-col justify-between z-10"
            >
              <div>
                <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                  {data[current].type}
                </span>
                <h3 className="text-xl font-bold text-zinc-100 mt-1">
                  {data[current].title}
                </h3>
                <p className="text-sm text-brand-muted mt-3 leading-relaxed line-clamp-3 md:line-clamp-none">
                  {data[current].description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 text-xs font-medium text-zinc-400">
                {data[current].tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Peek Card */}
        <div className="absolute right-[-40%] md:right-[-15%] w-[50%] md:w-[35%] h-60 opacity-20 pointer-events-none scale-90 bg-brand-card p-6 rounded-xl border border-zinc-800/80 blur-[1px] hidden sm:flex flex-col justify-between select-none">
          <div>
            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              {data[getCardIndex(1)].type}
            </span>
            <h3 className="text-base font-bold text-zinc-500 mt-1 line-clamp-1">
              {data[getCardIndex(1)].title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? "w-6 bg-brand-accent" : "w-1.5 bg-zinc-800"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
