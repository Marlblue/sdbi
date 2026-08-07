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

const PAGINATED_ARTICLES_QUERY = /* groq */ `
  {
    "items": *[_type == "article" && defined(slug.current)] | order(date desc) [$start...$end] {
      ${LIST_FIELDS}
    },
    "total": count(*[_type == "article" && defined(slug.current)])
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

export type PaginatedArticles = {
  items: ArticleListItem[];
  total: number;
};

export const ARTICLES_PER_PAGE = 9;

export async function getAllArticles(): Promise<ArticleListItem[]> {
  return sanityFetch<ArticleListItem[]>(ALL_ARTICLES_QUERY);
}

export async function getPaginatedArticles(
  page: number,
  pageSize: number = ARTICLES_PER_PAGE
): Promise<PaginatedArticles> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return sanityFetch<PaginatedArticles>(PAGINATED_ARTICLES_QUERY, { start, end });
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

export async function getPaginatedArticlesByTag(
  tag: string,
  page: number,
  pageSize: number = ARTICLES_PER_PAGE
): Promise<PaginatedArticles> {
  const articles = await getArticlesByTag(tag);
  const start = (page - 1) * pageSize;
  return {
    items: articles.slice(start, start + pageSize),
    total: articles.length,
  };
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
