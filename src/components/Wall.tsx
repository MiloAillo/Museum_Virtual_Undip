function Wall() {
  return (
    <group>
      {/* Main gallery wall with texture */}
      <mesh position={[0, 2, -5.2]} receiveShadow>
        <boxGeometry args={[20, 8, 0.3]} />
        <meshStandardMaterial 
          color="#d9d4c8" 
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>

      {/* Wall trim/molding at top */}
      <mesh position={[0, 5.9, -5.1]} castShadow>
        <boxGeometry args={[20, 0.2, 0.15]} />
        <meshStandardMaterial 
          color="#f5f2e8" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Wall baseboard */}
      <mesh position={[0, -1.4, -5.1]} castShadow>
        <boxGeometry args={[20, 0.15, 0.1]} />
        <meshStandardMaterial 
          color="#3d3329" 
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Wooden parquet floor with pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#4a3929" 
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Floor reflection plane (subtle) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Ceiling with recessed lighting panels */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#2a2520" 
          roughness={0.8}
          emissive="#1a1510"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Ceiling light panels */}
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[x, 5.95, -3]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial 
            color="#fffef8"
            emissive="#fff8e1"
            emissiveIntensity={0.6}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Left wall with subtle texture */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 2, 0]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial 
          color="#cfc9ba" 
          roughness={0.95}
        />
      </mesh>

      {/* Right wall with subtle texture */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[10, 2, 0]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial 
          color="#cfc9ba" 
          roughness={0.95}
        />
      </mesh>

      {/* Decorative rope barrier posts */}
      {[-8, 8].map((x, i) => (
        <group key={i} position={[x, -1.5, 1]}>
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
      <mesh position={[0, 1.1, 1]}>
        <cylinderGeometry args={[0.02, 0.02, 16, 8]} />
        <meshStandardMaterial 
          color="#8B0000"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

export default Wall
