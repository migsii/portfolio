"use client";

import { useState } from "react";
import { Project } from "@/types/portfolio";
import ConfirmationModal from "./ConfirmationModal";

interface ProjectsFormProps {
  initialData: Project[];
}

export default function ProjectsForm({ initialData }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange = (
    index: number,
    field: keyof Project,
    value: string,
  ) => {
    setProjects((prev) =>
      prev.map((proj, i) =>
        i === index
          ? {
              ...proj,
              [field]:
                field === "tags"
                  ? value.split(",").map((t) => t.trim())
                  : value,
            }
          : proj,
      ),
    );
  };

  const handleAddProject = () => {
    const newProject: Project = {
      title: "",
      type: "",
      description: "",
      tags: [],
    };

    setProjects((prev) => [...prev, newProject]);
  };

  const handleDeleteProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
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
        body: JSON.stringify({ projects }),
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
          Manage Projects
        </h2>

        <div className="space-y-6 max-h-125 overflow-y-auto pr-2">
          {projects.map((proj, index) => (
            <div
              key={index}
              className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="E.g., Personal Portfolio Website"
                  value={proj.title}
                  onChange={(e) =>
                    handleFieldChange(index, "title", e.target.value)
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe your project in a few sentences"
                  value={proj.description}
                  onChange={(e) =>
                    handleFieldChange(index, "description", e.target.value)
                  }
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="E.g., React, Node.js, Python"
                  value={proj.tags.join(", ")}
                  onChange={(e) =>
                    handleFieldChange(index, "tags", e.target.value)
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">
                  Project Type
                </label>
                <input
                  type="text"
                  placeholder="E.g., Web App / Mobile App / API"
                  value={proj.type}
                  onChange={(e) =>
                    handleFieldChange(index, "type", e.target.value)
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-zinc-100"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-5">
          <button
            type="button"
            onClick={handleAddProject}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
          >
            Add Project
          </button>

          <button
            type="submit"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Save Projects
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleActualSave}
        title="Confirm Project Updates"
        message="Are you sure you want to save these modifications to your active projects database record?"
        loading={isSaving}
      />
    </>
  );
}
