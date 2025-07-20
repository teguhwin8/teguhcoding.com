import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "5mfl0kn7",
  dataset: "production",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Queries
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, slug}
}`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "author": author->{name, image, bio},
  "categories": categories[]->{title, slug}
}`;

export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "categories": categories[]->{title, slug}
}`;

// Client functions
export async function getAllPosts() {
  return client.fetch(postsQuery);
}

export async function getPost(slug: string) {
  return client.fetch(postQuery, { slug });
}

export async function getLatestPosts(limit: number = 3) {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "categories": categories[]->{title, slug}
  }`;
  return client.fetch(query);
}
