import articlesData from "./articles-data.json";

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readTime: string;
};

export const articles: Article[] = [...(articlesData as Article[])].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getLatestArticles(count: number): Article[] {
  return articles.slice(0, count);
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
