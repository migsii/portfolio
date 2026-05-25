import { Skill } from "@/types/portfolio";

export default function Skills({ data }: { data: Skill[] }) {
  return (
    <section id="skills" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-brand-accent mb-6">
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((skill, index) => (
          <div
            key={index}
            className="bg-brand-card p-5 rounded-xl border border-zinc-800/80"
          >
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              {skill.category}
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed">
              {skill.items}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
