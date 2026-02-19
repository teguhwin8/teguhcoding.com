"use client";

import { motion } from "framer-motion";
import { List } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="retro-card p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center space-x-2 mb-4 text-black dark:text-white pb-2 border-b-2 border-dashed border-black dark:border-white">
                <List size={20} />
                <span className="font-bold text-lg uppercase tracking-wider">Daftar Isi</span>
            </div>
            <ul className="space-y-3">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 1.5}rem` }}
                        className="text-sm"
                    >
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                            className={cn(
                                "block hover:text-black dark:hover:text-white transition-colors duration-200",
                                activeId === heading.id
                                    ? "font-bold text-black dark:text-white flex items-center before:content-['>'] before:mr-2 before:text-retro-yellow"
                                    : "text-gray-500 dark:text-gray-400"
                            )}
                            dangerouslySetInnerHTML={{ __html: heading.text }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
