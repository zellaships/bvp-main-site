'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { NavigationData, NewsletterSettingsData, SharedContentData } from '@/sanity/lib/site-data'

interface SiteDataContextValue {
  navigation: NavigationData | null
  newsletter: NewsletterSettingsData | null
  shared: SharedContentData | null
}

// Default empty context value
const defaultContextValue: SiteDataContextValue = {
  navigation: null,
  newsletter: null,
  shared: null,
}

const SiteDataContext = createContext<SiteDataContextValue>(defaultContextValue)

interface SiteDataProviderProps {
  children: ReactNode
  data: SiteDataContextValue
}

export function SiteDataProvider({ children, data }: SiteDataProviderProps) {
  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  )
}

// Returns the site data context, with fallback to defaults when outside provider
export function useSiteData(): SiteDataContextValue {
  return useContext(SiteDataContext)
}

export function useNavigation(): NavigationData | null {
  const { navigation } = useSiteData()
  return navigation
}

export function useNewsletterSettings(): NewsletterSettingsData | null {
  const { newsletter } = useSiteData()
  return newsletter
}

export function useSharedContent(): SharedContentData | null {
  const { shared } = useSiteData()
  return shared
}
