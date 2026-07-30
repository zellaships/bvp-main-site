// Live Content API for real-time updates and Visual Editing
// Render <SanityLive /> in your root layout to enable real-time updates
// See: https://github.com/sanity-io/next-sanity#live-content-api
import { defineLive } from "next-sanity/live";
import { client } from './client'
import { token } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Use a recent API version for Stega encoding
    apiVersion: '2024-06-01',
  }),
  // Token required for draft mode / authenticated preview
  serverToken: token,
  browserToken: token,
});
