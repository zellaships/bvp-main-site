import { type SchemaTypeDefinition } from 'sanity'
import { page } from './page'
import { teamMember } from './teamMember'
import { partner } from './partner'
import { press } from './press'
import { faq } from './faq'
import { siteSettings } from './siteSettings'
import { homepageSettings } from './homepageSettings'
import { aboutPageSettings } from './aboutPageSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, teamMember, partner, press, faq, siteSettings, homepageSettings, aboutPageSettings],
}
