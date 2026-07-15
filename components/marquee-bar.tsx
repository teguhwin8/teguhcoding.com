export function MarqueeBar() {
  const items = [
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "NestJS",
    "Tailwind CSS",
    "PostgreSQL",
    "6+ Years Experience",
    "Open to Work",
    "Frontend",
    "Fullstack",
    "Web Development",
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-3.5">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-5 text-sm font-medium text-[var(--text-muted)] whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
