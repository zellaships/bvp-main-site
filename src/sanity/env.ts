export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-05'

// Use fallback values for CI/build environments where env vars may not be set
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Default project ID for build environments (this is the public project ID)
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'okhc01nt'
