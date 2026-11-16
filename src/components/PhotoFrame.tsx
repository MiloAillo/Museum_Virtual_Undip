import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface PhotoFrameProps {
  position: [number, number, number]
  label: string
}

function PhotoFrame({ position, label }: PhotoFrameProps) {
  // Frame dimensions
  const photoWidth = 2
  const photoHeight = 1.5 // 4:3 aspect ratio
  const frameThickness = 0.12
  const frameDepth = 0.2

  // Create ornate frame geometry with beveled edges
  const createFrameGeometry = (width: number, height: number) => {
    const shape = new THREE.Shape()
    const outerW = width / 2
    const outerH = height / 2
    const innerW = (width - frameThickness * 2) / 2
    const innerH = (height - frameThickness * 2) / 2

    // Outer rectangle
    shape.moveTo(-outerW, -outerH)
    shape.lineTo(outerW, -outerH)
    shape.lineTo(outerW, outerH)
    shape.lineTo(-outerW, outerH)
    shape.lineTo(-outerW, -outerH)

    // Inner rectangle (hole)
    const hole = new THREE.Path()
    hole.moveTo(-innerW, -innerH)
    hole.lineTo(-innerW, innerH)
    hole.lineTo(innerW, innerH)
    hole.lineTo(innerW, -innerH)
    hole.lineTo(-innerW, -innerH)
    shape.holes.push(hole)

    return new THREE.ExtrudeGeometry(shape, {
      depth: frameDepth,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    })
  }

  const frameGeometry = createFrameGeometry(photoWidth + frameThickness * 2, photoHeight + frameThickness * 2)

  return (
    <group position={position}>
      {/* Main ornate wooden frame */}
      <mesh geometry={frameGeometry} position={[0, 0, -0.1]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#4a3728"
          metalness={0.1}
          roughness={0.6}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Gold leaf inner accent - top */}
      <mesh position={[0, photoHeight / 2 + 0.04, 0.05]} castShadow>
        <boxGeometry args={[photoWidth + 0.1, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.15}
          emissive="#B8860B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Gold leaf inner accent - bottom */}
      <mesh position={[0, -(photoHeight / 2) - 0.04, 0.05]} castShadow>
        <boxGeometry args={[photoWidth + 0.1, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.15}
          emissive="#B8860B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Gold leaf inner accent - left */}
      <mesh position={[-(photoWidth / 2) - 0.04, 0, 0.05]} castShadow>
        <boxGeometry args={[0.03, photoHeight + 0.1, 0.03]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.15}
          emissive="#B8860B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Gold leaf inner accent - right */}
      <mesh position={[photoWidth / 2 + 0.04, 0, 0.05]} castShadow>
        <boxGeometry args={[0.03, photoHeight + 0.1, 0.03]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.15}
          emissive="#B8860B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Photo mat/backing */}
      <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
        <planeGeometry args={[photoWidth + 0.15, photoHeight + 0.15]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
      </mesh>

      {/* Photo/Image placeholder with subtle gradient */}
      <mesh position={[0, 0, 0.09]} receiveShadow>
        <planeGeometry args={[photoWidth, photoHeight]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.7}
          metalness={0.05}
          emissive="#1a1a1a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glass reflection effect */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[photoWidth, photoHeight]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.0}
          transmission={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* Elegant brass placard plate */}
      <mesh position={[0, -(photoHeight / 2) - 0.35, 0.05]} castShadow>
        <boxGeometry args={[1.2, 0.3, 0.03]} />
        <meshStandardMaterial
          color="#b87333"
          metalness={0.8}
          roughness={0.25}
          emissive="#3d2817"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Label text with better styling */}
      <Text
        position={[0, -(photoHeight / 2) - 0.35, 0.08]}
        fontSize={0.12}
        color="#1a1612"
        anchorX="center"
        anchorY="middle"
        fontWeight={600}
        letterSpacing={0.02}
      >
        {label}
      </Text>

      {/* Decorative corner ornaments */}
      {[
        [-photoWidth / 2 - 0.08, photoHeight / 2 + 0.08],
        [photoWidth / 2 + 0.08, photoHeight / 2 + 0.08],
        [-photoWidth / 2 - 0.08, -(photoHeight / 2) - 0.08],
        [photoWidth / 2 + 0.08, -(photoHeight / 2) - 0.08],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.06]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.95}
            roughness={0.1}
            emissive="#B8860B"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default PhotoFrame
