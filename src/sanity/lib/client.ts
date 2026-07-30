import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disabled for immediate content updates
})

// Safe fetch wrapper that handles build-time errors gracefully
export async function safeFetch<T>(
  query: string,
  defaultValue: T | null = null
): Promise<T | null> {
  // Skip Sanity fetches during build if env vars might not be fully available
  if (typeof window === 'undefined' && !projectId) {
    return defaultValue
  }

  try {
    const result = await client.fetch<T>(query)
    return result
  } catch (error) {
    // During build/static generation, Sanity client may fail
    console.error('Sanity fetch failed:', error)
    return defaultValue
  }
}
