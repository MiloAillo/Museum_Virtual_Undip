import { useRef, useState } from 'react'
import { Mesh } from 'three'
import type { BookData } from './BookshelfScene'
import { Text } from '@react-three/drei'

interface BookProps {
  book: BookData
  onClick: () => void
}

function Book({ book, onClick }: BookProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <group position={book.position}>
      {/* Book spine/cover */}
      <mesh
        ref={meshRef}
        rotation={book.rotation}
        castShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0.15]}
      >
        <boxGeometry args={[0.2, 0.5, 0.3]} />
        <meshStandardMaterial 
          color={hovered ? '#FFD700' : book.color}
          roughness={0.6}
          metalness={0.2}
          emissive={hovered ? '#B8860B' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Book title on spine */}
      <Text
        position={[0, 0, 0.32]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.04}
        color="#f0e6d2"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.45}
      >
        {book.title}
      </Text>

      {/* Highlight glow when hovered */}
      {hovered && (
        <pointLight
          position={[0, 0, 0.5]}
          intensity={1}
          distance={1}
          color="#FFD700"
        />
      )}
    </group>
  )
}

export default Book
