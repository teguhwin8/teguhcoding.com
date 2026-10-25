interface FaqSectionProps {
  items: { question: string; answer: string }[];
  title?: string;
}

export function FaqSection({ items, title = "Pertanyaan yang Sering Diajukan" }: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6"
      >
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.question} className="clean-card p-5 group">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-[var(--text)]">
              <h3>{item.question}</h3>
              <span
                aria-hidden="true"
                className="text-[var(--text-muted)] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
