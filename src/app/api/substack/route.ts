import { NextResponse } from 'next/server';

export interface SubstackPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string | null;
  videoThumbnails?: string[]; // Multiple frames for hover scrub
  isVideo?: boolean;
}

// Cache the feed for 5 minutes to avoid hitting Substack too often
let cachedData: { posts: SubstackPost[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check cache
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json({ posts: cachedData.posts });
    }

    const response = await fetch('https://blackveteransproject.substack.com/feed', {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xml = await response.text();
    const posts = parseRSS(xml);

    // Update cache
    cachedData = { posts, timestamp: Date.now() };

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Substack feed:', error);

    // Return cached data if available, even if stale
    if (cachedData) {
      return NextResponse.json({ posts: cachedData.posts, stale: true });
    }

    return NextResponse.json(
      { error: 'Failed to fetch feed', posts: [] },
      { status: 500 }
    );
  }
}

function parseRSS(xml: string): SubstackPost[] {
  const posts: SubstackPost[] = [];

  // Extract all <item> elements
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];

    // Extract title
    const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
                       itemContent.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? decodeHTMLEntities(titleMatch[1].trim()) : '';

    // Extract description
    const descMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                      itemContent.match(/<description>([\s\S]*?)<\/description>/);
    let description = descMatch ? descMatch[1].trim() : '';
    // Strip HTML tags and decode entities
    description = description.replace(/<[^>]*>/g, '').trim();
    description = decodeHTMLEntities(description);
    // Truncate to ~150 chars
    if (description.length > 150) {
      description = description.substring(0, 147) + '...';
    }

    // Extract link
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
    const link = linkMatch ? linkMatch[1].trim() : '';

    // Extract pubDate
    const dateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const pubDate = dateMatch ? dateMatch[1].trim() : '';

    // Get content for deeper extraction
    const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
    const content = contentMatch ? contentMatch[1] : '';

    // Extract video info and thumbnails
    const { imageUrl, videoThumbnails, isVideo } = extractMediaInfo(itemContent, content);

    if (title && link) {
      posts.push({
        title,
        description,
        link,
        pubDate,
        imageUrl,
        videoThumbnails,
        isVideo,
      });
    }
  }

  return posts.slice(0, 6); // Return max 6 posts
}

/**
 * Extract media info including video thumbnails for hover scrub
 */
function extractMediaInfo(itemContent: string, content: string): {
  imageUrl: string | null;
  videoThumbnails: string[];
  isVideo: boolean;
} {
  let imageUrl: string | null = null;
  const videoThumbnails: string[] = [];
  let isVideo = false;

  // Check for Substack video URLs in content
  // Pattern: https://substack-video.s3.amazonaws.com/video_upload/post/{postId}/{uuid}/...
  const substackVideoMatch = content.match(
    /https:\/\/substack-video\.s3\.amazonaws\.com\/video_upload\/post\/(\d+)\/([a-f0-9-]+)/
  );

  if (substackVideoMatch) {
    isVideo = true;
    const [, postId, uuid] = substackVideoMatch;
    const baseUrl = `https://substack-video.s3.amazonaws.com/video_upload/post/${postId}/${uuid}`;

    // Generate multiple frame thumbnails for hover scrub (frames 1-5)
    for (let i = 1; i <= 5; i++) {
      videoThumbnails.push(`${baseUrl}/transcoded-0000${i}.png`);
    }

    // Use first frame as main image
    imageUrl = videoThumbnails[0];
  }

  // Check for YouTube videos
  const youtubeMatch = content.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  if (youtubeMatch && !imageUrl) {
    isVideo = true;
    const videoId = youtubeMatch[1];

    // YouTube thumbnail URLs at different quality levels
    // These are different frames/qualities, good for visual variety
    videoThumbnails.push(
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`
    );

    imageUrl = videoThumbnails[0];
  }

  // Try enclosure for image
  if (!imageUrl) {
    const enclosureMatch = itemContent.match(/<enclosure[^>]*url="([^"]*)"[^>]*type="image[^"]*"/);
    if (enclosureMatch) {
      imageUrl = enclosureMatch[1];
    }
  }

  // Try media:content
  if (!imageUrl) {
    const mediaMatch = itemContent.match(/<media:content[^>]*url="([^"]*)"/);
    if (mediaMatch) {
      imageUrl = mediaMatch[1];
    }
  }

  // Try to find any image in content
  if (!imageUrl && content) {
    // Look for any image URL, prioritizing larger sizes
    const imgMatches = content.matchAll(/<img[^>]*src="([^"]*)"/g);
    for (const imgMatch of imgMatches) {
      const src = imgMatch[1];
      // Skip tiny tracking pixels and icons
      if (!src.includes('tracking') && !src.includes('pixel') && !src.includes('icon')) {
        imageUrl = src;
        break;
      }
    }
  }

  // Check if title/description indicates video content
  if (!isVideo) {
    const lowerContent = (itemContent + content).toLowerCase();
    isVideo = lowerContent.includes('watch now') ||
              lowerContent.includes('video') ||
              lowerContent.includes('mins)') ||
              lowerContent.includes('minutes)');
  }

  return { imageUrl, videoThumbnails, isVideo };
}

function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&nbsp;': ' ',
  };

  return text.replace(/&[^;]+;/g, (entity) => entities[entity] || entity);
}
