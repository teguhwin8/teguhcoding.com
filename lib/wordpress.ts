import { WordPressPost } from "./types";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

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
    const url = `${WORDPRESS_API_URL}${path}`;

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    const auth = getAuthHeader();
    if (auth.Authorization) {
        headers.set("Authorization", auth.Authorization);
    }

    const res = await fetch(url, {
        ...options,
        headers,
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch WordPress API: ${res.statusText}`);
    }

    return res.json();
}

export async function getAllPosts(): Promise<WordPressPost[]> {
    return fetchWordPress<WordPressPost[]>("/posts?_embed&per_page=100&status=publish,private");
}

export async function getLatestPosts(limit: number = 3): Promise<WordPressPost[]> {
    return fetchWordPress<WordPressPost[]>(`/posts?_embed&per_page=${limit}&status=publish,private`);
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
