interface LightingProps {
  frames: Array<{ id: number; label: string; position: [number, number, number] }>
}

function Lighting({ frames }: LightingProps) {
  return (
    <>
      {/* Warm ambient museum lighting */}
      <ambientLight intensity={0.25} color="#f5ead6" />

      {/* Key spotlights for each frame - dramatic museum lighting */}
      {frames.map((frame) => (
        <group key={frame.id}>
          {/* Main spotlight */}
          <spotLight
            position={[frame.position[0], frame.position[1] + 3, frame.position[2] + 1.5]}
            angle={0.35}
            penumbra={0.6}
            intensity={3.5}
            color="#fffdf7"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            target-position={frame.position}
          />
          {/* Secondary fill light for softer shadows */}
          <spotLight
            position={[frame.position[0] + 1, frame.position[1] + 2.5, frame.position[2] + 2]}
            angle={0.5}
            penumbra={0.8}
            intensity={0.8}
            color="#fff8e1"
            target-position={frame.position}
          />
        </group>
      ))}

      {/* Ceiling panel lights */}
      {[-6, -2, 2, 6].map((x, i) => (
        <pointLight
          key={i}
          position={[x, 5.5, -3]}
          intensity={1.2}
          distance={8}
          decay={2}
          color="#fffbf0"
        />
      ))}

      {/* Rim light from behind for depth */}
      <directionalLight
        position={[0, 3, 5]}
        intensity={0.4}
        color="#e8dcc4"
      />

      {/* Ground bounce light (simulates light reflecting off floor) */}
      <hemisphereLight
        args={['#ffffff', '#4a3929', 0.3]}
        position={[0, 1, 0]}
      />

      {/* Subtle side accent lights */}
      <pointLight
        position={[-8, 2, -3]}
        intensity={0.5}
        distance={6}
        decay={2}
        color="#f0e6d2"
      />
      <pointLight
        position={[8, 2, -3]}
        intensity={0.5}
        distance={6}
        decay={2}
        color="#f0e6d2"
      />

      {/* Atmospheric fog for depth */}
      <fog attach="fog" args={['#1a1a1a', 8, 20]} />
    </>
  )
}

export default Lighting
