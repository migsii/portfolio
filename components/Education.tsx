import { Education as EduType } from "@/types/portfolio";

export default function Education({ data }: { data: EduType[] }) {
  return (
    <section id="education" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-brand-accent mb-6">
        Education
      </h2>
      <div className="space-y-6">
        {data.map((edu, index) => (
          <div
            key={index}
            className="bg-brand-card p-5 rounded-xl border border-zinc-800/80 flex justify-between items-start"
          >
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                {edu.degree}
              </h3>
              <p className="text-sm text-brand-muted mt-0.5">
                {edu.school} • {edu.location}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-md border ${edu.featured ? "text-brand-accent bg-brand-accent/10 border-brand-accent/20" : "text-zinc-400 bg-zinc-800/50 border-zinc-800"}`}
            >
              {edu.period}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
