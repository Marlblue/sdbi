import type { PortableTextBlock } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/fetch";

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticleSeo = {
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  imageAlt?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  faq?: ArticleFaq[];
};

export type ArticleListItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  readTime: string;
};

export type Article = ArticleListItem & {
  content: PortableTextBlock[];
  seo?: ArticleSeo;
};

const LIST_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  date,
  excerpt,
  "image": image.asset->url,
  "category": coalesce(category, "Uncategorized"),
  "tags": coalesce(tags, []),
  "readTime": coalesce(readTime, "5 MENIT BACA"),
`;

const ALL_ARTICLES_QUERY = /* groq */ `
  *[_type == "article" && defined(slug.current)] | order(date desc) {
    ${LIST_FIELDS}
  }
`;

const ARTICLE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "article" && slug.current == $slug][0] {
    ${LIST_FIELDS}
    "content": content[]{
      ...,
      _type == "image" => { ..., "asset": asset-> }
    },
    seo
  }
`;

export async function getAllArticles(): Promise<ArticleListItem[]> {
  return sanityFetch<ArticleListItem[]>(ALL_ARTICLES_QUERY);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const article = await sanityFetch<Article | null>(ARTICLE_BY_SLUG_QUERY, { slug });
  return article ?? undefined;
}

export async function getLatestArticles(count: number): Promise<ArticleListItem[]> {
  const articles = await getAllArticles();
  return articles.slice(0, count);
}

export async function getArticlesByTag(tag: string): Promise<ArticleListItem[]> {
  const normalized = tag.trim().toLowerCase();
  const articles = await getAllArticles();
  return articles.filter((a) => a.tags.some((t) => t.trim().toLowerCase() === normalized));
}

export function formatTanggal(dateStr: string): string {
  const bulanMap: Record<string, string> = {
    "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR",
    "05": "MEI", "06": "JUN", "07": "JUL", "08": "AGU",
    "09": "SEP", "10": "OKT", "11": "NOV", "12": "DES",
  };
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d, 10)} ${bulanMap[m]} ${y}`;
}
