import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // reads go through Next.js's fetch cache (tag-based revalidation), not Sanity's CDN
})
