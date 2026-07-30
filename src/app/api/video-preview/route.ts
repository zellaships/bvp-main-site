import { NextResponse } from 'next/server';

export interface VideoPreviewData {
  postId: string;
  videoId: string;
  thumbnails: {
    default: string;
    frames: string[];
  };
  video: {
    preview: string;    // Lower quality for preview (480p)
    standard: string;   // Standard quality (720p)
    high: string;       // High quality (1080p)
  };
  /** Whether direct video playback is available (false for Substack due to CORS) */
  videoAccessible: boolean;
  duration?: number;
  previewStartTime?: number;
  previewEndTime?: number;
}

interface VideoMapping {
  [key: string]: {
    postId: string;
    uuid: string;
    substackPostId?: string;
  };
}

// Centralized mapping of known video posts
// This allows easy updates without code changes to component
const VIDEO_MAPPINGS: VideoMapping = {
  'kyle bibby': {
    postId: '205756958',
    uuid: '090a140a-c077-418f-aa37-c54b0c13868a',
  },
  'daniele anderson': {
    postId: '205701935',
    uuid: '9efe6ebe-08bd-4e2e-9794-5f7d7b19fefc',
  },
  'zella vanie': {
    postId: '205701936',
    uuid: '78e36313-dedc-4a36-b9d4-5b72bb91c36b',
  },
  'rich brookshire': {
    postId: '204565342',
    uuid: 'e00af18f-de75-4033-b60a-af01beab8968',
  },
  'congressional': {
    postId: '189895249',
    uuid: 'bfad24c4-b3be-422f-b983-393f3840145c',
  },
};

// Cache for video metadata
let metadataCache: Map<string, { data: VideoPreviewData; timestamp: number }> = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

function buildSubstackVideoUrls(postId: string, uuid: string) {
  const baseUrl = `https://substack-video.s3.amazonaws.com/video_upload/post/${postId}/${uuid}`;

  return {
    thumbnails: {
      default: `${baseUrl}/transcoded-00001.png`,
      frames: Array.from({ length: 10 }, (_, i) =>
        `${baseUrl}/transcoded-${String(i + 1).padStart(5, '0')}.png`
      ),
    },
    video: {
      preview: `${baseUrl}/480p.mp4`,
      standard: `${baseUrl}/720p.mp4`,
      high: `${baseUrl}/1080p.mp4`,
    },
  };
}

async function verifyThumbnailUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Note: Substack video files (.mp4) return 403 Forbidden when accessed directly
// Videos must be played through Substack's embedded player
// We can still provide the URLs for reference, but direct playback won't work
// Thumbnails (.png) are accessible and work fine

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title')?.toLowerCase();

  if (!title) {
    return NextResponse.json(
      { error: 'Title parameter required' },
      { status: 400 }
    );
  }

  // Check cache first
  const cached = metadataCache.get(title);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  }

  // Find matching video mapping
  let mapping: { postId: string; uuid: string } | null = null;

  for (const [key, value] of Object.entries(VIDEO_MAPPINGS)) {
    if (title.includes(key)) {
      mapping = value;
      break;
    }
  }

  if (!mapping) {
    return NextResponse.json(
      { error: 'No video found for this title' },
      { status: 404 }
    );
  }

  const urls = buildSubstackVideoUrls(mapping.postId, mapping.uuid);

  // Verify thumbnail exists (videos return 403 but thumbnails work)
  const thumbnailExists = await verifyThumbnailUrl(urls.thumbnails.default);

  if (!thumbnailExists) {
    return NextResponse.json(
      { error: 'Video content not found' },
      { status: 404 }
    );
  }

  // Note: videoAccessible is false because Substack blocks direct video access
  // The URLs are provided for reference but won't work for direct playback

  const data: VideoPreviewData = {
    postId: mapping.postId,
    videoId: mapping.uuid,
    thumbnails: urls.thumbnails,
    video: urls.video,
    // Substack blocks direct video access - set to false
    videoAccessible: false,
    // Default preview window: first 6 seconds
    previewStartTime: 0,
    previewEndTime: 6,
  };

  // Update cache
  metadataCache.set(title, { data, timestamp: Date.now() });

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}

// Endpoint to get all known videos
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titles } = body as { titles: string[] };

    if (!titles || !Array.isArray(titles)) {
      return NextResponse.json(
        { error: 'Titles array required' },
        { status: 400 }
      );
    }

    const results: Record<string, VideoPreviewData | null> = {};

    for (const title of titles) {
      const lowerTitle = title.toLowerCase();

      // Check cache
      const cached = metadataCache.get(lowerTitle);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        results[title] = cached.data;
        continue;
      }

      // Find mapping
      let mapping: { postId: string; uuid: string } | null = null;
      for (const [key, value] of Object.entries(VIDEO_MAPPINGS)) {
        if (lowerTitle.includes(key)) {
          mapping = value;
          break;
        }
      }

      if (mapping) {
        const urls = buildSubstackVideoUrls(mapping.postId, mapping.uuid);
        const data: VideoPreviewData = {
          postId: mapping.postId,
          videoId: mapping.uuid,
          thumbnails: urls.thumbnails,
          video: urls.video,
          videoAccessible: false, // Substack blocks direct video access
          previewStartTime: 0,
          previewEndTime: 6,
        };

        metadataCache.set(lowerTitle, { data, timestamp: Date.now() });
        results[title] = data;
      } else {
        results[title] = null;
      }
    }

    return NextResponse.json({ videos: results }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
