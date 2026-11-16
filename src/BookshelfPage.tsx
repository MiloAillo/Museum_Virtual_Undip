import { Canvas } from '@react-three/fiber'
import BookshelfScene from './components/bookshelf/BookshelfScene'

function BookshelfPage() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 75 }}
      style={{ background: '#0a0a0a' }}
      shadows
      gl={{ 
        antialias: true,
        toneMapping: 2,
        toneMappingExposure: 1.2
      }}
    >
      <BookshelfScene />
    </Canvas>
  )
}

export default BookshelfPage
