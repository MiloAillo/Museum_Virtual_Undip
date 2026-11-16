# Virtual Museum Gallery - Museum Virtual Undip

A cinematic 3D museum gallery experience built with React Three Fiber, featuring ornate photo frames with smooth navigation.

## Features

✨ **Cinematic Presentation**
- Ornate museum-quality photo frames with gold leaf accents
- Dramatic gallery lighting with spotlights on each frame
- Post-processing effects (bloom, vignette, depth of field, ambient occlusion)
- Realistic materials with proper metalness and roughness
- Atmospheric museum environment with wooden floors and textured walls

🎮 **Intuitive Navigation**
- **Keyboard**: Use arrow keys (← →) to navigate between frames
- **Touch**: Swipe left/right on mobile devices
- Smooth camera animations with linear interpolation
- Focus on one frame at a time

🖼️ **Gallery Details**
- 4 photo frames representing different time periods:
  - 1997-2000
  - 2001-2005
  - 2006-2015
  - 2016-Present
- Each frame has a brass placard with labels
- 4:3 aspect ratio for photos (ready for your images)

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## Tech Stack

- **React 19** - UI framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects
- **TypeScript** - Type safety
- **Vite** - Build tool

## Customization

### Adding Your Own Photos

Edit `src/components/PhotoFrame.tsx` and replace the placeholder meshes with actual image textures:

```tsx
import { useTexture } from '@react-three/drei'

// Inside PhotoFrame component:
const texture = useTexture('/path/to/your/image.jpg')

<mesh position={[0, 0, 0.09]}>
  <planeGeometry args={[photoWidth, photoHeight]} />
  <meshStandardMaterial map={texture} />
</mesh>
```

### Changing Time Periods

Edit `src/components/GalleryScene.tsx`:

```tsx
const frames = [
  { id: 0, label: 'Your Label', position: [-6, 1.6, -5] },
  // Add more frames...
]
```

### Adjusting Camera Speed

In `src/components/GalleryScene.tsx`, modify the lerp factor (currently `0.02`):
- Lower = slower, smoother
- Higher = faster, snappier

## Performance

The gallery uses:
- Shadow mapping for realistic shadows
- SSAO for ambient occlusion
- Multisampling (8x) for anti-aliasing
- Optimized materials and lighting

## License

MIT

---

Built with ❤️ for Museum Virtual Undip
