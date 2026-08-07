import { client } from "./client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ["article"]
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags },
  });
}
