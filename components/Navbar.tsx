"use client";

interface NavbarProps {
  navItems: string[];
  scrollToSection: (id: string) => void;
}

export default function Navbar({ navItems, scrollToSection }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-bg/80 border-b border-zinc-800/50 px-6 py-4">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <span className="font-bold text-lg tracking-wider text-brand-accent">
          MM
        </span>
        <div className="flex gap-6 text-sm font-medium text-brand-muted">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="hover:text-zinc-50 transition-colors cursor-pointer capitalize"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
