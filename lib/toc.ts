import { parse } from "node-html-parser";

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}

export function extractHeadingsAndAddIds(html: string): { content: string; headings: Heading[] } {
    const root = parse(html);
    const headings: Heading[] = [];
    const headingElements = root.querySelectorAll("h1, h2, h3, h4");

    headingElements.forEach((el) => {
        const text = el.textContent.trim();
        if (!text) return;

        const id = slugify(text);
        const level = parseInt(el.tagName.replace("H", ""));

        el.setAttribute("id", id);
        headings.push({ id, text, level });
    });

    return {
        content: root.toString(),
        headings,
    };
}
