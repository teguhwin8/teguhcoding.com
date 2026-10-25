/**
 * Shared writing rules for AI-generated blog posts (generate-post and
 * generate-youtube). Optimised for SEO and GEO: answer-first intro,
 * question headings, original analysis, and an FAQ section that
 * app/blog/[slug] turns into FAQPage JSON-LD.
 */
export const POST_STRUCTURE_GUIDELINES = `Structure rules for the 'excerpt' (all in Indonesian):
1. Open with a 2-3 sentence paragraph (no heading) that directly answers the main question or states the key facts: what happened or what it is, who is involved, when, and why it matters. No warm-up sentences.
2. Use '## ' section headings. Where natural, phrase them as questions readers would actually search for (e.g. '## Apa Bedanya dengan Versi Sebelumnya?').
3. Keep concrete facts from the source: names, versions, dates, numbers, prices. Never invent facts, numbers, quotes, benchmarks, or personal experiences/tests that are not in the source.
4. When comparing options, versions, or tools, use a Markdown table.
5. Include a section titled exactly '## Catatan Teguh' with original analysis for Indonesian developers and businesses: practical implications, who should care, how to apply it, risks or caveats. This is opinion and analysis, clearly grounded in the source facts; do not claim hands-on testing.
6. End with a section titled exactly '## FAQ' containing 3-5 questions as '### ' headings (each ending with '?'), each followed by a 1-3 sentence answer based only on the source.
7. Do not add a separate conclusion section after the FAQ.`;
