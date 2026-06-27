import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  source_url: string;
  tags: string[];
  date: string;
  cover_image?: string;
  excerpt: string;
}

// Ensure the directory exists
function ensureDirectoryExists() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  ensureDirectoryExists();
  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      const { title, source_url, tags, date, cover_image } = matterResult.data;

      // Extract excerpt (we can just use the content since it's meant to be short)
      const excerpt = matterResult.content.trim();

      return {
        slug,
        title: title || 'Untitled',
        source_url: source_url || '#',
        tags: tags || [],
        date: date || new Date().toISOString(),
        cover_image: cover_image || null,
        excerpt,
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureDirectoryExists();
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  const { title, source_url, tags, date, cover_image } = matterResult.data;
  const excerpt = matterResult.content.trim();

  return {
    slug,
    title: title || 'Untitled',
    source_url: source_url || '#',
    tags: tags || [],
    date: date || new Date().toISOString(),
    cover_image: cover_image || null,
    excerpt,
  };
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  ensureDirectoryExists();
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }));
}
