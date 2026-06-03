"use client";

import { useState } from "react";
import { AboutData } from "@/types/portfolio";
import ConfirmationModal from "./ConfirmationModal";

interface AboutFormProps {
  initialData: AboutData;
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const [formData, setFormData] = useState<AboutData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        body: JSON.stringify({ about: formData }),
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
          Edit Profile Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-accent text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase mb-2">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Your professional title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-accent text-zinc-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-muted uppercase mb-2">
            Bio / Description
          </label>
          <textarea
            name="description"
            placeholder="Tell us about yourself"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-accent text-zinc-100 resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* 3. Render the shared confirmation modal overlay */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleActualSave}
        title="Confirm Profile Updates"
        message="Are you sure you want to update your public profile header information in the database?"
        loading={isSaving}
      />
    </>
  );
}
