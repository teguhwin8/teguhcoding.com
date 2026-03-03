import { WordPressPost } from "./types";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;
const WORDPRESS_TIMEOUT_MS = 8000;

const getAuthHeader = () => {
    if (!WORDPRESS_USERNAME || !WORDPRESS_APP_PASSWORD) {
        return {};
    }
    const token = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_APP_PASSWORD}`).toString("base64");
    return {
        Authorization: `Basic ${token}`,
    };
};

export async function fetchWordPress<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (!WORDPRESS_API_URL) {
        throw new Error("WORDPRESS_API_URL is not configured");
    }

    const url = `${WORDPRESS_API_URL}${path}`;

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    const auth = getAuthHeader();
    if (auth.Authorization) {
        headers.set("Authorization", auth.Authorization);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WORDPRESS_TIMEOUT_MS);

    const res = await fetch(url, {
        ...options,
        headers,
        signal: options.signal ?? controller.signal,
        next: { revalidate: 60 },
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) {
        throw new Error(`Failed to fetch WordPress API: ${res.statusText}`);
    }

    return res.json();
}

export async function getAllPosts(): Promise<WordPressPost[]> {
    return fetchWordPress<WordPressPost[]>("/posts?_embed&per_page=100&status=publish,private");
}

export async function getLatestPosts(limit: number = 3): Promise<WordPressPost[]> {
    const safeLimit = Math.max(1, Math.min(limit, 20));
    return fetchWordPress<WordPressPost[]>(`/posts?_embed&per_page=${safeLimit}&status=publish,private`);
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const posts = await fetchWordPress<WordPressPost[]>(`/posts?_embed&slug=${slug}&status=publish,private`);
    return posts.length > 0 ? posts[0] : null;
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
    const posts = await fetchWordPress<WordPressPost[]>("/posts?per_page=100&status=publish,private");
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function searchPosts(query: string): Promise<WordPressPost[]> {
    if (!query || query.trim().length < 2) return [];
    const encoded = encodeURIComponent(query.trim());
    return fetchWordPress<WordPressPost[]>(`/posts?_embed&search=${encoded}&per_page=20&status=publish,private`);
}
