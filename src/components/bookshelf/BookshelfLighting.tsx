function BookshelfLighting() {
  return (
    <>
      {/* Warm ambient library lighting */}
      <ambientLight intensity={0.4} color="#f5ead6" />

      {/* Main overhead lights */}
      <pointLight
        position={[0, 5, 0]}
        intensity={2}
        distance={10}
        decay={2}
        color="#fffbf0"
        castShadow
      />

      {/* Bookshelf spotlights - illuminate each section */}
      {[-2.5, 0, 2.5].map((x, i) => (
        <spotLight
          key={`spot-${i}`}
          position={[x, 4.5, 0]}
          angle={0.6}
          penumbra={0.5}
          intensity={1.5}
          color="#fff8e1"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          target-position={[x, 2, -2]}
        />
      ))}

      {/* Wall sconce lights */}
      {[-5, 5].map((x, i) => (
        <pointLight
          key={`sconce-${i}`}
          position={[x, 3.2, -2.8]}
          intensity={0.8}
          distance={4}
          decay={2}
          color="#fff8e1"
        />
      ))}

      {/* Soft fill light from reading area */}
      <pointLight
        position={[0, 1.5, 4]}
        intensity={0.5}
        distance={5}
        decay={2}
        color="#f0e6d2"
      />

      {/* Hemisphere for natural bounce */}
      <hemisphereLight
        args={['#fff8e1', '#3d1a0a', 0.4]}
        position={[0, 1, 0]}
      />

      {/* Rim light for depth */}
      <directionalLight
        position={[5, 3, 5]}
        intensity={0.3}
        color="#e8dcc4"
      />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#0a0a0a', 10, 18]} />
    </>
  )
}

export default BookshelfLighting
