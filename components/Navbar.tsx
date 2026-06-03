"use client";

import { useState } from "react";

interface NavbarProps {
  navItems: string[];
  scrollToSection: (id: string) => void;
}

export default function Navbar({ navItems, scrollToSection }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (item: string) => {
    scrollToSection(item);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-bg/80 border-b border-zinc-800/50 px-6 py-4">
      <nav className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <span className="font-bold text-lg tracking-wider text-brand-accent">
          MM
        </span>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-brand-muted">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className="hover:text-zinc-50 transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-brand-muted" />
          <span className="w-6 h-0.5 bg-brand-muted" />
          <span className="w-6 h-0.5 bg-brand-muted" />
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 border-t border-zinc-800/50 pt-3 flex flex-col gap-4 text-sm font-medium text-brand-muted">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className="text-left capitalize hover:text-zinc-50 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
