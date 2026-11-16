import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import PhotoFrame from './PhotoFrame'
import Wall from './Wall'
import Lighting from './Lighting'
import Effects from './Effects'

const frames = [
  { id: 0, label: '1997-2000', position: [-6, 1.6, -5] as [number, number, number] },
  { id: 1, label: '2001-2005', position: [-2, 1.6, -5] as [number, number, number] },
  { id: 2, label: '2006-2015', position: [2, 1.6, -5] as [number, number, number] },
  { id: 3, label: '2016-Present', position: [6, 1.6, -5] as [number, number, number] },
]

function GalleryScene() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const targetPosition = useRef(new Vector3(frames[0].position[0], 1.6, -3))
  const { camera } = useThree()
  
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentFrame((prev) => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentFrame((prev) => Math.min(frames.length - 1, prev + 1))
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      const diff = touchStartX.current - touchEndX.current
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swiped left - next frame
          setCurrentFrame((prev) => Math.min(frames.length - 1, prev + 1))
        } else {
          // Swiped right - previous frame
          setCurrentFrame((prev) => Math.max(0, prev - 1))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    targetPosition.current.set(frames[currentFrame].position[0], 1.6, -3)
  }, [currentFrame])

  useFrame(() => {
    // Smooth camera movement with slower lerp (0.02 instead of 0.05)
    camera.position.x += (targetPosition.current.x - camera.position.x) * 0.02
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.02
    camera.position.z += (targetPosition.current.z - camera.position.z) * 0.02
    
    // Always look straight ahead at the wall (not following the target frame)
    camera.lookAt(camera.position.x, camera.position.y, -5)
  })

  return (
    <>
      <Lighting frames={frames} />
      <Wall />
      
      {frames.map((frame) => (
        <PhotoFrame
          key={frame.id}
          position={frame.position}
          label={frame.label}
        />
      ))}

      <Effects />
    </>
  )
}

export default GalleryScene
