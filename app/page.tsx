"use client";

import { useCallback, useEffect, useState } from "react";
import { PortfolioData, ApiResponse } from "@/types/portfolio";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const NAV_ITEMS = ["about", "skills", "experience", "projects", "education"];

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function fetchPortfolio() {
      try {
        const res = await fetch(`${window.location.origin}/api/portfolio`);
        if (!res.ok) return;
        const json: ApiResponse = await res.json();
        if (json.success) {
          setPortfolio(json.data);
        }
      } catch {
        console.error("Error loading portfolio data");
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-muted">
        <p className="animate-pulse">Loading portfolio resources...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navItems={NAV_ITEMS} scrollToSection={scrollToSection} />

      <main className="max-w-4xl mx-auto px-6 py-12 grow w-full space-y-24">
        {portfolio && (
          <>
            <About data={portfolio.about} />
            <Skills data={portfolio.skills} />
            <Experience data={portfolio.experience} />
            <Projects data={portfolio.projects} />
            <Education data={portfolio.education} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
