export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorName: string;
  authorImage: string;
  authorBio: string;
  publishDate: string;
  date: string;
  category: string;
}

export interface BlogImage {
  key: string;
  name: string;
  path: string;
}
