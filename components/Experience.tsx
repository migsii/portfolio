import { Experience as ExpType } from "@/types/portfolio";

export default function Experience({ data }: { data: ExpType[] }) {
  return (
    <section id="experience" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-brand-accent mb-6">
        Work Experience
      </h2>
      <div className="space-y-8">
        {data.map((exp, index) => (
          <div key={index} className="border-l-2 border-zinc-800 pl-6 relative">
            <div
              className={`absolute w-3 h-3 rounded-full -left-1.75 top-1.5 ${exp.current ? "bg-brand-accent" : "bg-zinc-700"}`}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <h3 className="text-xl font-bold text-zinc-100">{exp.role}</h3>
              <span className="text-sm text-brand-muted">{exp.period}</span>
            </div>
            <p className="text-sm font-medium text-zinc-400 mt-1">
              {exp.company} • {exp.location}
            </p>
            <ul className="list-disc list-inside mt-3 text-sm text-brand-muted space-y-2">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
