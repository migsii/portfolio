"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import portfolioData from "@/data/portfolioData.json";
import AboutForm from "./_components/AboutForm";
import SkillsForm from "./_components/SkillsForm";
import ExperienceForm from "./_components/ExperienceForm";
import ProjectsForm from "./_components/ProjectsForm";

type Tab = "about" | "skills" | "experience" | "projects";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const { data } = portfolioData;
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/portfolio/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-zinc-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-brand-accent">
              Management Dashboard
            </h1>
            <p className="text-sm text-brand-muted mt-1">
              Update your portfolio content blocks.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </header>

        <div className="flex gap-8">
          {/* Dashboard Sidebar */}
          <nav className="w-48 flex flex-col gap-2">
            {(["about", "skills", "experience", "projects"] as Tab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-brand-accent text-zinc-950 font-semibold"
                      : "text-brand-muted hover:bg-zinc-900"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </nav>

          {/* Form Content Hub */}
          <main className="flex-1 bg-brand-card border border-zinc-800/80 rounded-xl p-6">
            {activeTab === "about" && <AboutForm initialData={data.about} />}
            {activeTab === "skills" && <SkillsForm initialData={data.skills} />}
            {activeTab === "experience" && (
              <ExperienceForm initialData={data.experience} />
            )}
            {activeTab === "projects" && (
              <ProjectsForm initialData={data.projects} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
