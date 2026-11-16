function LibraryRoom() {
  return (
    <group>
      {/* Floor - rich carpeting */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial 
          color="#3d1a0a"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial 
          color="#2a1810"
          roughness={0.8}
          emissive="#1a1510"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Back wall behind bookshelf */}
      <mesh position={[0, 2.5, -3]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial 
          color="#4a2f1f"
          roughness={0.95}
        />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 2.5, 0]} receiveShadow>
        <planeGeometry args={[15, 6]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.95}
        />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 2.5, 0]} receiveShadow>
        <planeGeometry args={[15, 6]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.95}
        />
      </mesh>

      {/* Wall sconces */}
      {[-5, 5].map((x, i) => (
        <group key={i} position={[x, 3, -2.9]}>
          {/* Sconce base */}
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.3, 0.1]} />
            <meshStandardMaterial 
              color="#8B7355"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Light bulb glow */}
          <mesh position={[0, 0.2, 0.1]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#fff8e1"
              emissive="#fff8e1"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Reading table in foreground */}
      <group position={[0, 0, 4]}>
        {/* Table top */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.05, 1]} />
          <meshStandardMaterial 
            color="#5a3f2a"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
        {/* Table legs */}
        {[[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.4, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <meshStandardMaterial 
              color="#4a3020"
              roughness={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Decorative rug under table */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 4]} receiveShadow>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial 
          color="#8B0000"
          roughness={0.9}
        />
      </mesh>

      {/* Wooden paneling trim at floor */}
      <mesh position={[0, -0.4, -2.95]}>
        <boxGeometry args={[20, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

export default LibraryRoom
