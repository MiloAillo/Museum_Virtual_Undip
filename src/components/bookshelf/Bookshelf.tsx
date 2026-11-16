import type { BookData } from './BookshelfScene'
import Book from './Book'

interface BookshelfProps {
  books: BookData[]
  onBookClick: (book: BookData) => void
}

function Bookshelf({ books, onBookClick }: BookshelfProps) {
  const shelfWidth = 8
  const shelfHeight = 5
  const shelfDepth = 0.8
  const shelfThickness = 0.05
  
  // Shelf positions for 3 stories
  const shelfYPositions = [0, 1.5, 3, 4.5]

  return (
    <group position={[0, 0, -2]}>
      {/* Main bookshelf structure */}
      {/* Back panel */}
      <mesh position={[0, 2.25, -shelfDepth / 2]} receiveShadow>
        <boxGeometry args={[shelfWidth, shelfHeight, 0.1]} />
        <meshStandardMaterial 
          color="#2a1810"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Horizontal shelves */}
      {shelfYPositions.map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[shelfWidth, shelfThickness, shelfDepth]} />
          <meshStandardMaterial 
            color="#4a3020"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Left vertical support */}
      <mesh position={[-shelfWidth / 2 + 0.1, 2.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, shelfHeight, shelfDepth]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Right vertical support */}
      <mesh position={[shelfWidth / 2 - 0.1, 2.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, shelfHeight, shelfDepth]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Top crown molding */}
      <mesh position={[0, 4.6, 0]} castShadow>
        <boxGeometry args={[shelfWidth, 0.15, shelfDepth + 0.1]} />
        <meshStandardMaterial 
          color="#5a3f2a"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Decorative books */}
      {books.map((book) => (
        <Book 
          key={book.id}
          book={book}
          onClick={() => onBookClick(book)}
        />
      ))}

      {/* Fill shelves with decorative non-interactive books */}
      {/* Bottom shelf decorative books */}
      {[-3.5, -1.5, -0.5, 1, 3].map((x, i) => (
        <mesh key={`deco-1-${i}`} position={[x, 0.55, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.25]} />
          <meshStandardMaterial 
            color={['#4a1a0a', '#2a2a1a', '#1a1a2a', '#3a1a1a', '#1a2a1a'][i]}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Middle shelf decorative books */}
      {[-3.5, -1.5, -0.5, 1, 3].map((x, i) => (
        <mesh key={`deco-2-${i}`} position={[x, 2.05, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.25]} />
          <meshStandardMaterial 
            color={['#2a1a0a', '#3a2a1a', '#1a2a2a', '#4a2a1a', '#1a3a1a'][i]}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Top shelf decorative books */}
      {[-3.5, -1.5, -0.5, 1, 3].map((x, i) => (
        <mesh key={`deco-3-${i}`} position={[x, 3.55, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.25]} />
          <meshStandardMaterial 
            color={['#3a1a2a', '#2a3a1a', '#1a1a3a', '#2a1a3a', '#1a4a1a'][i]}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Bookshelf
