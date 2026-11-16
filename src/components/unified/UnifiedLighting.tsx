interface UnifiedLightingProps {
  viewMode: 'frames' | 'bookshelf'
  transitionProgress: number
}

function UnifiedLighting({ viewMode, transitionProgress }: UnifiedLightingProps) {
  // Calculate light intensities based on view mode and transition
  const isTransitioning = transitionProgress > 0 && transitionProgress < 1
  
  let framesIntensity = viewMode === 'frames' ? 1 : 0.3
  let bookshelfIntensity = viewMode === 'bookshelf' ? 1 : 0.3
  
  if (isTransitioning) {
    if (viewMode === 'bookshelf') {
      framesIntensity = 1 - transitionProgress * 0.7
      bookshelfIntensity = 0.3 + transitionProgress * 0.7
    } else {
      framesIntensity = 0.3 + transitionProgress * 0.7
      bookshelfIntensity = 1 - transitionProgress * 0.7
    }
  }

  return (
    <>
      {/* Main ambient light */}
      <ambientLight intensity={0.6} color="#f5ead6" />

      {/* Single overhead light for frames area */}
      <pointLight
        position={[0, 5, -3]}
        intensity={2.5 * framesIntensity}
        distance={15}
        decay={2}
        color="#fffbf0"
      />

      {/* Single overhead light for bookshelf area */}
      <pointLight
        position={[0, 5, 3]}
        intensity={2.5 * bookshelfIntensity}
        distance={15}
        decay={2}
        color="#fffbf0"
      />

      {/* Hemisphere for natural bounce */}
      <hemisphereLight
        args={['#fff8e1', '#3d1a0a', 0.5]}
        position={[0, 1, 0]}
      />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#0a0a0a', 15, 30]} />
    </>
  )
}

export default UnifiedLighting
