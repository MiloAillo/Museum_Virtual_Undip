function UnifiedRoom() {
  return (
    <group>
      {/* Extended floor - covers both areas */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 25]} />
        <meshStandardMaterial 
          color="#4a3929" 
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Floor reflection plane (subtle) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 0]}>
        <planeGeometry args={[30, 25]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Extended ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[30, 25]} />
        <meshStandardMaterial 
          color="#2a2520" 
          roughness={0.8}
          emissive="#1a1510"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Ceiling light panels distributed across the room */}
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={`ceiling-panel-back-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[x, 5.95, -3]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial 
            color="#fffef8"
            emissive="#fff8e1"
            emissiveIntensity={0.6}
            roughness={0.9}
          />
        </mesh>
      ))}

      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={`ceiling-panel-front-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[x, 5.95, 3]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial 
            color="#fffef8"
            emissive="#fff8e1"
            emissiveIntensity={0.6}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 2, 0]} receiveShadow>
        <planeGeometry args={[25, 8]} />
        <meshStandardMaterial 
          color="#cfc9ba" 
          roughness={0.95}
        />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[10, 2, 0]} receiveShadow>
        <planeGeometry args={[25, 8]} />
        <meshStandardMaterial 
          color="#cfc9ba" 
          roughness={0.95}
        />
      </mesh>

      {/* Decorative rope barrier posts - between bookshelf and frames */}
      {[-8, 8].map((x, i) => (
        <group key={`barrier-${i}`} position={[x, -1.5, -1]}>
          {/* Post base */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 0.2, 16]} />
            <meshStandardMaterial 
              color="#8B7355"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Post pole */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
            <meshStandardMaterial 
              color="#8B7355"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Post top */}
          <mesh position={[0, 1.15, 0]} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#B8860B"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Velvet rope between posts */}
      <mesh position={[0, 1.1, -1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 16, 8]} />
        <meshStandardMaterial 
          color="#8B0000"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Reading table near bookshelf */}
      <group position={[5, 0, 5]}>
        {/* Table top */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 1]} />
          <meshStandardMaterial 
            color="#5a3f2a"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
        {/* Table legs */}
        {[[-0.6, -0.4], [0.6, -0.4], [-0.6, 0.4], [0.6, 0.4]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.4, z]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            <meshStandardMaterial 
              color="#4a3020"
              roughness={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Small decorative rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -1.49, 5]} receiveShadow>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial 
          color="#8B0000"
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}

export default UnifiedRoom
