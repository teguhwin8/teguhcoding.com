export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface SanityBlockContent {
  _type: "block";
  children: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
}

export interface Author {
  _id: string;
  name: string;
  image?: SanityImageAsset;
  bio?: SanityBlockContent[];
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImageAsset;
  body?: SanityBlockContent[];
  author: Author;
  categories: Category[];
}

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        width: number;
        height: number;
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
}

