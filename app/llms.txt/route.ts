import { getAllPosts } from "@/lib/markdown";
import { projects } from "@/lib/projects";
import { SITE_URL, toDescription } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts();

  const lines = [
    "# Teguh Widodo",
    "",
    "> Portfolio dan tech blog Teguh Widodo, Senior Software Engineer & Web Developer dengan 6+ tahun pengalaman di Next.js, React, NestJS, dan TypeScript. Konten blog berbahasa Indonesia tentang web development, AI, dan tools developer.",
    "",
    "## Halaman Utama",
    "",
    `- [Home](${SITE_URL}/): Profil dan ringkasan keahlian`,
    `- [Projects](${SITE_URL}/projects): Portfolio proyek web development`,
    `- [Experience](${SITE_URL}/experience): Riwayat pengalaman kerja`,
    `- [Education](${SITE_URL}/education): Pendidikan dan sertifikasi`,
    `- [Contact](${SITE_URL}/contact): Kontak untuk kebutuhan website atau aplikasi`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}`,
    ),
    "",
    "## Blog",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${toDescription(post.excerpt, 140)}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
