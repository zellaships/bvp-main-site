# PRD: Video Hover Preview Feature

## Document Info
- **Version**: 2.0
- **Status**: IMPLEMENTED - TESTING
- **Created**: 2026-07-10
- **Updated**: 2026-07-10
- **Author**: Engineering

---

## 1. Problem Statement

Video cards in the Substack feed section display static thumbnails. Users expect a YouTube-style hover preview where:
1. Video fades in on hover
2. Silent preview plays automatically
3. Visual feedback indicates video content

**Current Limitation**: Substack videos return 403 Forbidden when accessed directly. Direct video streaming is blocked by Substack's CDN authentication.

---

## 2. Proposed Solution

### Primary Approach: Frame-Based Animation
Since direct video playback is blocked, implement a **frame cycling animation** that:
- Cycles through 10 pre-extracted thumbnail frames on hover
- Creates a "flipbook" preview effect (similar to early YouTube)
- Provides immediate visual feedback
- Works without video streaming

### Interaction Design (IxD) Specification

| State | Visual Behavior |
|-------|-----------------|
| **Default** | Static thumbnail (frame 1) |
| **Hover Start** | 300ms delay, then scale to 1.03 |
| **Hover Active** | Cycle frames at 300ms intervals (3.3 FPS flipbook) |
| **Hover End** | Fade back to frame 1, scale to 1.0 |

### Animation Timeline
```
t=0ms     Mouse enters
t=300ms   Begin scale animation (1.0 → 1.03)
t=400ms   Start frame cycling (frame 1 → 2 → 3...)
t=3300ms  All 10 frames shown, loop back to frame 1
t=exit    Fade to frame 1, scale back to 1.0
```

---

## 3. Approval Points

### AP-1: Interaction Model
**Question**: Which hover behavior is preferred?

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **A. Frame Cycling** | Flipbook through 10 frames at ~3 FPS | Works without video access, lightweight | Not smooth like video |
| **B. Cross-fade Frames** | Smooth crossfade between frames | More polished appearance | Slightly more complex |
| **C. Static + Badge Only** | Just show "VIDEO" badge, no animation | Simplest, fastest | No preview experience |

**Recommendation**: Option B (Cross-fade Frames) for premium feel

---

### AP-2: Timing Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Hover delay | 300ms | Prevents accidental triggers |
| Frame duration | 400ms | Smooth cycling, 10 frames = 4 sec loop |
| Transition duration | 300ms | Smooth crossfade between frames |
| Scale factor | 1.03 | Subtle lift effect |

**[ ] APPROVED** / **[ ] MODIFY**

---

### AP-3: Visual Indicators

| Element | Behavior |
|---------|----------|
| VIDEO badge | Fades out when animating |
| Progress bar | Shows position in frame loop (gold color) |
| Gradient overlay | Subtle on hover, removed during animation |
| Scale effect | 1.03x on hover |

**[ ] APPROVED** / **[ ] MODIFY**

---

## 4. Technical Implementation

### 4.1 Component: VideoFramePlayer

```typescript
interface VideoFramePlayerProps {
  frames: string[];           // Array of frame URLs (10 frames)
  alt: string;
  isVideo: boolean;
  priority?: boolean;
  frameDuration?: number;     // ms per frame (default: 400)
  transitionDuration?: number; // crossfade duration (default: 300)
  hoverDelay?: number;        // delay before animation (default: 300)
}
```

### 4.2 Frame Preloading Strategy
- Preload frames when card enters viewport (200px threshold)
- Use `IntersectionObserver` for lazy loading
- Cache frames in browser memory

### 4.3 Performance Considerations
- Max 10 frames per video (30-40KB total)
- Use Next.js Image optimization
- Implement cleanup on unmount

---

## 5. Success Metrics

| Metric | Target |
|--------|--------|
| Frame load time | < 500ms for all 10 frames |
| Animation smoothness | 60 FPS CSS transitions |
| Memory per card | < 5MB |
| User engagement | Increased click-through on video posts |

---

## 6. Implementation Phases

### Phase 1: Core Animation (Current)
- [ ] Build VideoFramePlayer component
- [ ] Implement frame cycling logic
- [ ] Add crossfade transitions
- [ ] Integrate with SubstackFeed

### Phase 2: Polish
- [ ] Add progress indicator
- [ ] Optimize frame preloading
- [ ] Handle error states gracefully

### Phase 3: Future (If Direct Video Access Becomes Available)
- [ ] Switch to actual video preview
- [ ] Add sound toggle option

---

## 7. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Substack changes frame URLs | Fallback to single thumbnail |
| High bandwidth usage | Lazy load, limit frame count |
| Browser compatibility | Use CSS-only fallback |

---

## 8. Sign-off

**To proceed with implementation, please confirm:**

1. **Interaction Model**: Frame cycling with crossfade? [Y/N]
2. **Timing Parameters**: As specified above? [Y/N]
3. **Visual Indicators**: Progress bar + scale effect? [Y/N]

---

---

## IMPLEMENTATION COMPLETE

### What Was Built

**Approach**: Self-hosted video clips with HTML5 video playback

**Files Modified/Created**:
1. `src/components/ui/VideoHoverPlayer.tsx` - Complete rewrite for video playback
2. `src/components/sections/SubstackFeed.tsx` - Updated to use video config
3. `src/config/videoPreviewConfig.ts` - New config file for video mappings
4. `public/videos/previews/` - Directory for video clips

**Current Videos Created**:
- `kyle-bibby.mp4` (730KB)
- `daniele-anderson.mp4` (592KB)
- `zella-vanie.mp4` (573KB)
- `rich-brookshire.mp4` (347KB)
- `congressional.mp4` (288KB)

### How to Test

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Scroll to the Substack feed section
4. Hover over any video card
5. After 400ms delay, video should fade in and play silently
6. Gold progress bar should appear at bottom
7. On mouse leave, video fades out and resets

### How to Add New Videos

1. Create a 5-10 second MP4 video clip (720p, H.264)
2. Save it to `/public/videos/previews/[slug].mp4`
3. Add entry to `src/config/videoPreviewConfig.ts`:
```typescript
{
  titleMatch: 'keyword in post title',
  previewPath: '/videos/previews/[slug].mp4',
  startTime: 0,
},
```

### Known Limitations

1. **Placeholder Videos**: Current videos are frame slideshows (1 FPS), not smooth video. Replace with actual video clips for production.
2. **File Size**: Each video adds ~300-700KB to page load. Optimize clips for web.
3. **Mobile**: Long-press required on touch devices (500ms).

### Next Steps

- [ ] Replace placeholder videos with actual smooth clips
- [ ] Add loading skeleton for video cards
- [ ] Consider lazy loading videos only when user starts scrolling
- [ ] Add analytics for video hover engagement
