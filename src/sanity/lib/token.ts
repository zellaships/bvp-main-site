// Token helper for authenticated Sanity operations
// Used for draft mode and preview

export const token = process.env.SANITY_API_READ_TOKEN

// Note: We don't throw here to allow builds without the token
// The token is only required for draft mode / live preview
