import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Bookshelf from './Bookshelf'
import LibraryRoom from './LibraryRoom'
import BookshelfLighting from './BookshelfLighting'
import BookReader from './BookReader'

export interface BookData {
  id: string
  title: string
  author: string
  color: string
  content: string
  position: [number, number, number]
  rotation: [number, number, number]
}

const books: BookData[] = [
  // Row 1 (Bottom)
  { id: 'book-1-1', title: 'Museum History I', author: 'J. Smith', color: '#8B4513', content: 'This is the first chapter of our museum\'s rich history, spanning from 1997 to 2000. In these formative years, the museum was established with a vision to preserve and showcase the cultural heritage of our region...', position: [-2.5, 0.5, 0], rotation: [0, 0, 0] },
  { id: 'book-1-2', title: 'Ancient Artifacts', author: 'M. Johnson', color: '#654321', content: 'A comprehensive guide to the ancient artifacts housed in our collection. Each piece tells a story of civilizations past, offering glimpses into daily life, religious practices, and artistic expression...', position: [0, 0.5, 0], rotation: [0, 0, 0] },
  { id: 'book-1-3', title: 'Cultural Heritage', author: 'R. Williams', color: '#A0522D', content: 'Exploring the cultural heritage preserved within these walls. From traditional ceremonies to contemporary interpretations, this volume captures the essence of our collective memory...', position: [2.5, 0.5, 0], rotation: [0, 0, 0] },
  
  // Row 2 (Middle)
  { id: 'book-2-1', title: 'Museum History II', author: 'L. Brown', color: '#6B4423', content: 'The middle years 2001-2005 brought expansion and innovation. New wings were added, collections grew, and educational programs flourished. This period marked our transformation into a modern institution...', position: [-2.5, 2, 0], rotation: [0, 0, 0] },
  { id: 'book-2-2', title: 'Art & Architecture', author: 'K. Davis', color: '#8B7355', content: 'A study of architectural marvels and artistic masterpieces. This book examines the intersection of form and function, beauty and purpose, tradition and innovation in museum design...', position: [0, 2, 0], rotation: [0, 0, 0] },
  { id: 'book-2-3', title: 'Conservation Tales', author: 'P. Miller', color: '#5C4033', content: 'Behind the scenes stories of conservation efforts. Learn about the meticulous work required to preserve artifacts for future generations, from climate control to restoration techniques...', position: [2.5, 2, 0], rotation: [0, 0, 0] },
  
  // Row 3 (Top)
  { id: 'book-3-1', title: 'Museum History III', author: 'S. Wilson', color: '#7B3F00', content: 'The modern era 2006-2015 saw digital transformation and global partnerships. Virtual tours, interactive exhibits, and international collaborations brought the museum into the 21st century...', position: [-2.5, 3.5, 0], rotation: [0, 0, 0] },
  { id: 'book-3-2', title: 'Future Visions', author: 'T. Moore', color: '#93642B', content: 'Looking ahead to the museum of tomorrow. This forward-thinking volume explores emerging technologies, sustainable practices, and innovative ways to engage future generations with our heritage...', position: [0, 3.5, 0], rotation: [0, 0, 0] },
  { id: 'book-3-3', title: 'Digital Archives', author: 'A. Taylor', color: '#6F4E37', content: 'The journey to digitize our entire collection. From 3D scanning to virtual reality experiences, discover how technology is revolutionizing access to cultural treasures...', position: [2.5, 3.5, 0], rotation: [0, 0, 0] },
]

function BookshelfScene() {
  const { camera } = useThree()
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null)
  const cameraTargetRef = useRef({ x: 0, y: 2 })
  const cameraVelocityRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const lastMousePosRef = useRef({ x: 0, y: 0 })

  // Camera boundaries
  const bounds = {
    minX: -3,
    maxX: 3,
    minY: 0.5,
    maxY: 4
  }

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || selectedBook) return

      const deltaX = e.clientX - lastMousePosRef.current.x
      const deltaY = e.clientY - lastMousePosRef.current.y

      cameraVelocityRef.current.x = deltaX * 0.01
      cameraVelocityRef.current.y = -deltaY * 0.01

      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || selectedBook) return

      const deltaX = e.touches[0].clientX - lastMousePosRef.current.x
      const deltaY = e.touches[0].clientY - lastMousePosRef.current.y

      cameraVelocityRef.current.x = deltaX * 0.01
      cameraVelocityRef.current.y = -deltaY * 0.01

      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = () => {
      isDraggingRef.current = false
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
  }, [selectedBook])

  useFrame(() => {
    if (selectedBook) return

    // Apply velocity to target
    cameraTargetRef.current.x += cameraVelocityRef.current.x
    cameraTargetRef.current.y += cameraVelocityRef.current.y

    // Apply friction/damping
    cameraVelocityRef.current.x *= 0.92
    cameraVelocityRef.current.y *= 0.92

    // Clamp to boundaries
    cameraTargetRef.current.x = Math.max(bounds.minX, Math.min(bounds.maxX, cameraTargetRef.current.x))
    cameraTargetRef.current.y = Math.max(bounds.minY, Math.min(bounds.maxY, cameraTargetRef.current.y))

    // Smooth camera movement with lerp
    camera.position.x += (cameraTargetRef.current.x - camera.position.x) * 0.08
    camera.position.y += (cameraTargetRef.current.y - camera.position.y) * 0.08

    // Always look straight ahead
    camera.lookAt(camera.position.x, camera.position.y, -10)
  })

  const handleBookClick = (book: BookData) => {
    setSelectedBook(book)
  }

  const handleCloseBook = () => {
    setSelectedBook(null)
  }

  return (
    <>
      <BookshelfLighting />
      <LibraryRoom />
      <Bookshelf books={books} onBookClick={handleBookClick} />
      
      {selectedBook && (
        <BookReader book={selectedBook} onClose={handleCloseBook} />
      )}
    </>
  )
}

export default BookshelfScene
