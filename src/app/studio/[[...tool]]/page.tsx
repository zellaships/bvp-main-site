'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
