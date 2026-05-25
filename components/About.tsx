import { AboutData } from "@/types/portfolio";

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="scroll-mt-24 pt-12">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-50">
        {data.name}
      </h1>
      <p className="text-xl text-brand-accent mt-2 font-medium">{data.title}</p>
      <p className="text-base text-brand-muted mt-4 max-w-2xl leading-relaxed">
        {data.description}
      </p>
      <div className="flex flex-wrap gap-4 mt-6 text-sm text-brand-muted">
        <span>{data.location}</span>
        <span>{data.email}</span>
        <a
          href={data.github}
          target="_blank"
          rel="noreferrer"
          className="hover:text-brand-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-brand-accent transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
