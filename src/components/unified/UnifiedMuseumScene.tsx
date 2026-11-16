import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import FrameGalleryArea from './FrameGalleryArea'
import BookshelfArea from './BookshelfArea'
import UnifiedRoom from './UnifiedRoom'
import UnifiedLighting from './UnifiedLighting'
import ViewToggleButton from './ViewToggleButton'
import type { BookData } from '../bookshelf/BookshelfScene'

type ViewMode = 'frames' | 'bookshelf'

const books: BookData[] = [
  // Row 1 (Bottom)
  { id: 'book-1-1', title: 'Museum History I', author: 'J. Smith', color: '#8B4513', content: 'This is the first chapter of our museum\'s rich history, spanning from 1997 to 2000. In these formative years, the museum was established with a vision to preserve and showcase the cultural heritage of our region. The founders envisioned a space where past and present could converge, creating a dialogue between generations. Through careful curation and community involvement, the museum quickly became a cornerstone of cultural preservation.', position: [-2.5, 0.5, 0], rotation: [0, 0, 0] },
  { id: 'book-1-2', title: 'Ancient Artifacts', author: 'M. Johnson', color: '#654321', content: 'A comprehensive guide to the ancient artifacts housed in our collection. Each piece tells a story of civilizations past, offering glimpses into daily life, religious practices, and artistic expression. From pottery shards to ceremonial objects, these artifacts connect us to our ancestors and their sophisticated understanding of the world. The preservation of these items requires constant vigilance and cutting-edge conservation techniques.', position: [0, 0.5, 0], rotation: [0, 0, 0] },
  { id: 'book-1-3', title: 'Cultural Heritage', author: 'R. Williams', color: '#A0522D', content: 'Exploring the cultural heritage preserved within these walls. From traditional ceremonies to contemporary interpretations, this volume captures the essence of our collective memory. Cultural heritage is not static but living, breathing, and evolving with each generation. It encompasses language, art, customs, and the intangible threads that bind communities together across time and space.', position: [2.5, 0.5, 0], rotation: [0, 0, 0] },
  
  // Row 2 (Middle)
  { id: 'book-2-1', title: 'Museum History II', author: 'L. Brown', color: '#6B4423', content: 'The middle years 2001-2005 brought expansion and innovation. New wings were added, collections grew, and educational programs flourished. This period marked our transformation into a modern institution while maintaining our commitment to historical authenticity. Digital cataloging systems were introduced, making our collections more accessible to researchers worldwide. Community outreach programs doubled in size.', position: [-2.5, 2, 0], rotation: [0, 0, 0] },
  { id: 'book-2-2', title: 'Art & Architecture', author: 'K. Davis', color: '#8B7355', content: 'A study of architectural marvels and artistic masterpieces. This book examines the intersection of form and function, beauty and purpose, tradition and innovation in museum design. Great architecture creates spaces that honor the past while embracing the future. Every arch, every column, every carefully placed window tells its own story. Museums are not merely containers but active participants in the narrative.', position: [0, 2, 0], rotation: [0, 0, 0] },
  { id: 'book-2-3', title: 'Conservation Tales', author: 'P. Miller', color: '#5C4033', content: 'Behind the scenes stories of conservation efforts. Learn about the meticulous work required to preserve artifacts for future generations, from climate control to restoration techniques. Each artifact presents unique challenges - wood, metal, textile, and paper all require different approaches. Conservators are part scientist, part artist, and wholly dedicated to stopping time itself in its tracks.', position: [2.5, 2, 0], rotation: [0, 0, 0] },
  
  // Row 3 (Top)
  { id: 'book-3-1', title: 'Museum History III', author: 'S. Wilson', color: '#7B3F00', content: 'The modern era 2006-2015 saw digital transformation and global partnerships. Virtual tours, interactive exhibits, and international collaborations brought the museum into the 21st century. Social media became a powerful tool for engagement. 3D scanning technology allowed us to share our collections with institutions worldwide. Yet we never lost sight of the intimate, personal experience that only a physical visit can provide.', position: [-2.5, 3.5, 0], rotation: [0, 0, 0] },
  { id: 'book-3-2', title: 'Future Visions', author: 'T. Moore', color: '#93642B', content: 'Looking ahead to the museum of tomorrow. This forward-thinking volume explores emerging technologies, sustainable practices, and innovative ways to engage future generations with our heritage. Augmented reality, artificial intelligence, and immersive experiences will transform how we interact with history. Yet the core mission remains unchanged: to inspire wonder, foster understanding, and connect people across time.', position: [0, 3.5, 0], rotation: [0, 0, 0] },
  { id: 'book-3-3', title: 'Digital Archives', author: 'A. Taylor', color: '#6F4E37', content: 'The journey to digitize our entire collection. From 3D scanning to virtual reality experiences, discover how technology is revolutionizing access to cultural treasures. Millions of people who could never visit in person can now explore our galleries from anywhere on Earth. Digital preservation also provides insurance against disaster, ensuring that even if the physical object is lost, its essence survives.', position: [2.5, 3.5, 0], rotation: [0, 0, 0] },
]

function UnifiedMuseumScene() {
  const { camera } = useThree()
  const [viewMode, setViewMode] = useState<ViewMode>('frames')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null)
  
  // Camera positions
  const framesCameraPos = new Vector3(0, 1.6, -3)
  const bookshelfCameraPos = new Vector3(0, 2, 5)
  
  const targetCameraPos = useRef(framesCameraPos.clone())
  const transitionProgress = useRef(0)
  
  // Frame gallery state
  const [currentFrame, setCurrentFrame] = useState(0)
  const frameTargetX = useRef(0)
  
  // Bookshelf state
  const bookshelfCameraTarget = useRef({ x: 0, y: 2 })
  const bookshelfCameraVelocity = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  const handleViewToggle = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    transitionProgress.current = 0
    
    const newMode = viewMode === 'frames' ? 'bookshelf' : 'frames'
    setViewMode(newMode)
    
    if (newMode === 'bookshelf') {
      targetCameraPos.current = bookshelfCameraPos.clone()
      // Reset bookshelf camera to center
      bookshelfCameraTarget.current = { x: 0, y: 2 }
      bookshelfCameraVelocity.current = { x: 0, y: 0 }
    } else {
      targetCameraPos.current = framesCameraPos.clone()
      // Keep frame position
      targetCameraPos.current.x = frameTargetX.current
    }
  }

  // Q key to toggle views
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'q' || e.key === 'Q') {
        handleViewToggle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode, isTransitioning])

  // Frame gallery controls
  useEffect(() => {
    if (viewMode !== 'frames' || isTransitioning) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentFrame((prev) => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentFrame((prev) => Math.min(3, prev + 1))
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const diff = lastMousePos.current.x - endX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          setCurrentFrame((prev) => Math.min(3, prev + 1))
        } else {
          setCurrentFrame((prev) => Math.max(0, prev - 1))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [viewMode, isTransitioning])

  // Bookshelf controls
  useEffect(() => {
    if (viewMode !== 'bookshelf' || isTransitioning || selectedBook) return

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = e.clientX - lastMousePos.current.x
      const deltaY = e.clientY - lastMousePos.current.y

      bookshelfCameraVelocity.current.x = deltaX * 0.01
      bookshelfCameraVelocity.current.y = -deltaY * 0.01

      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return

      const deltaX = e.touches[0].clientX - lastMousePos.current.x
      const deltaY = e.touches[0].clientY - lastMousePos.current.y

      bookshelfCameraVelocity.current.x = deltaX * 0.01
      bookshelfCameraVelocity.current.y = -deltaY * 0.01

      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = () => {
      isDragging.current = false
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [viewMode, isTransitioning, selectedBook])

  // Update frame target position
  useEffect(() => {
    const framePositions = [-6, -2, 2, 6]
    frameTargetX.current = framePositions[currentFrame]
  }, [currentFrame])

  useFrame((_state, delta) => {
    if (isTransitioning) {
      // Smooth transition between views
      transitionProgress.current += delta * 0.8
      
      if (transitionProgress.current >= 1) {
        transitionProgress.current = 1
        setIsTransitioning(false)
      }

      const startPos = viewMode === 'bookshelf' ? framesCameraPos : bookshelfCameraPos
      const endPos = viewMode === 'bookshelf' ? bookshelfCameraPos : framesCameraPos
      
      if (viewMode === 'frames') {
        endPos.x = frameTargetX.current
      }

      // Ease-in-out interpolation
      const t = transitionProgress.current
      const smoothT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

      camera.position.lerpVectors(startPos, endPos, smoothT)
      camera.lookAt(camera.position.x, camera.position.y, viewMode === 'bookshelf' ? -10 : -5)
      
    } else if (viewMode === 'frames') {
      // Frame gallery camera control
      camera.position.x += (frameTargetX.current - camera.position.x) * 0.02
      camera.lookAt(camera.position.x, camera.position.y, -5)
      
    } else if (viewMode === 'bookshelf' && !selectedBook) {
      // Bookshelf camera control
      bookshelfCameraTarget.current.x += bookshelfCameraVelocity.current.x
      bookshelfCameraTarget.current.y += bookshelfCameraVelocity.current.y

      bookshelfCameraVelocity.current.x *= 0.92
      bookshelfCameraVelocity.current.y *= 0.92

      // Boundaries
      bookshelfCameraTarget.current.x = Math.max(-3, Math.min(3, bookshelfCameraTarget.current.x))
      bookshelfCameraTarget.current.y = Math.max(0.5, Math.min(4, bookshelfCameraTarget.current.y))

      camera.position.x += (bookshelfCameraTarget.current.x - camera.position.x) * 0.08
      camera.position.y += (bookshelfCameraTarget.current.y - camera.position.y) * 0.08

      camera.lookAt(camera.position.x, camera.position.y, -10)
    }
  })

  const handleBookClick = (book: BookData) => {
    setSelectedBook(book)
  }

  const handleCloseBook = () => {
    setSelectedBook(null)
  }

  return (
    <>
      <UnifiedLighting viewMode={viewMode} transitionProgress={transitionProgress.current} />
      <UnifiedRoom />
      
      {/* Wall of frames at the back */}
      <FrameGalleryArea />
      
      {/* Bookshelf in front */}
      <BookshelfArea 
        books={books} 
        onBookClick={handleBookClick}
        selectedBook={selectedBook}
        onCloseBook={handleCloseBook}
      />
      
      <ViewToggleButton 
        viewMode={viewMode} 
        onToggle={handleViewToggle}
        disabled={isTransitioning}
      />
    </>
  )
}

export default UnifiedMuseumScene
