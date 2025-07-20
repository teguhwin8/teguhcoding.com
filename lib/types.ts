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
