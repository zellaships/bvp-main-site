'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()

  // Only show outside of Presentation Tool (when viewing directly in draft mode)
  if (environment !== 'live' && environment !== 'unknown') return null

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
    >
      Exit Preview Mode
    </a>
  )
}
