export interface Author {
  _id: string;
  name: string;
  image?: any;
  bio?: any;
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
  mainImage?: any;
  body?: any;
  author: Author;
  categories: Category[];
}
