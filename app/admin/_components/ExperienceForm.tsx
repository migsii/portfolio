"use client";

import { useState } from "react";
import { Experience } from "@/types/portfolio";
import ConfirmationModal from "./ConfirmationModal";

interface ExperienceFormProps {
  initialData: Experience[];
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange = (
    index: number,
    field: keyof Experience,
    value: string | boolean,
  ) => {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    );
  };

  const handleBulletChange = (
    expIndex: number,
    bulletIndex: number,
    value: string,
  ) => {
    setExperiences((prev) =>
      prev.map((exp, i) => {
        if (i !== expIndex) return exp;
        const updatedBullets = [...exp.bullets];
        updatedBullets[bulletIndex] = value;
        return { ...exp, bullets: updatedBullets };
      }),
    );
  };

  const handleAddExperience = () => {
    const newExperience: Experience = {
      role: "",
      company: "",
      location: "",
      period: "",
      current: false,
      bullets: [""],
    };

    setExperiences((prev) => [...prev, newExperience]);
  };

  const handleAddBullet = (expIndex: number) => {
    setExperiences((prev) =>
      prev.map((exp, i) =>
        i === expIndex ? { ...exp, bullets: [...exp.bullets, ""] } : exp,
      ),
    );
  };

  const handleDeleteBullet = (expIndex: number, bulletIndex: number) => {
    setExperiences((prev) =>
      prev.map((exp, i) => {
        if (i !== expIndex) return exp;

        return {
          ...exp,
          bullets: exp.bullets.filter((_, idx) => idx !== bulletIndex),
        };
      }),
    );
  };

  const handleDeleteExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
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
        body: JSON.stringify({ experience: experiences }),
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
          Manage Experience
        </h2>

        <div className="space-y-6 max-h-130 overflow-y-auto pr-2">
          {experiences.map((exp, expIdx) => (
            <div
              key={expIdx}
              className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Software Engineer"
                    value={exp.role}
                    onChange={(e) =>
                      handleFieldChange(expIdx, "role", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Google"
                    value={exp.company}
                    onChange={(e) =>
                      handleFieldChange(expIdx, "company", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                    Period
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Jan 2020 - Present"
                    value={exp.period}
                    onChange={(e) =>
                      handleFieldChange(expIdx, "period", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100"
                  />
                </div>
                <div className="flex items-center h-full pt-6">
                  <label className="flex items-center gap-2 text-sm text-brand-muted font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        handleFieldChange(expIdx, "current", e.target.checked)
                      }
                      className="accent-brand-accent rounded bg-zinc-950 border-zinc-800 h-4 w-4"
                    />
                    Current Job
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-brand-muted uppercase">
                  Key Achievements / Bullets
                </label>

                {exp.bullets.map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="E.g., Led a team of 5 engineers..."
                      value={bullet}
                      onChange={(e) =>
                        handleBulletChange(expIdx, bulletIdx, e.target.value)
                      }
                      className="flex-1 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-1.5 text-xs focus:outline-none text-zinc-200"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteBullet(expIdx, bulletIdx)}
                      className="text-red-400 hover:text-red-300 font-bold text-lg px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddBullet(expIdx)}
                  className="text-xs px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-200"
                >
                  + Add Bullet
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteExperience(expIdx)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete Experience
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-5">
          <button
            type="button"
            onClick={handleAddExperience}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
          >
            Add Experience
          </button>
          <button
            type="submit"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Save Experience
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleActualSave}
        title="Confirm Experience Updates"
        message="Are you sure you want to write these work record changes into your active cloud production database collection?"
        loading={isSaving}
      />
    </>
  );
}
