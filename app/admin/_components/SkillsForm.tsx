"use client";

import { useState } from "react";
import { Skill } from "@/types/portfolio";
import ConfirmationModal from "./ConfirmationModal";

interface SkillsFormProps {
  initialData: Skill[];
}

export default function SkillsForm({ initialData }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleItemsChange = (index: number, value: string) => {
    setSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, items: value } : skill,
      ),
    );
  };

  const handleSubmitTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleActualSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/portfolio/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skills }),
      });

      if (res.ok) {
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitTrigger} className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-100 mb-4">
          Edit Core Skills
        </h2>

        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="p-4 bg-zinc-900/50 border border-zinc-850 rounded-lg"
            >
              <label className="block text-xs font-semibold text-brand-accent uppercase mb-2">
                {skill.category}
              </label>
              <input
                type="text"
                placeholder="Comma-separated skills (e.g., React, Node.js, Python)"
                value={skill.items}
                onChange={(e) => handleItemsChange(index, e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-accent text-zinc-100"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleActualSave}
        title="Confirm Updates"
        message="Are you sure you want to write these modifications into your active cloud production portfolio data collection?"
        loading={isSaving}
      />
    </>
  );
}
