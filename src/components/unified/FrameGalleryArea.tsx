import PhotoFrame from '../PhotoFrame'
import Wall from '../Wall'

const frames = [
  { id: 0, label: '1997-2000', position: [-6, 1.6, -5] as [number, number, number] },
  { id: 1, label: '2001-2005', position: [-2, 1.6, -5] as [number, number, number] },
  { id: 2, label: '2006-2015', position: [2, 1.6, -5] as [number, number, number] },
  { id: 3, label: '2016-Present', position: [6, 1.6, -5] as [number, number, number] },
]

function FrameGalleryArea() {
  return (
    <group>
      <Wall />
      
      {frames.map((frame) => (
        <PhotoFrame
          key={frame.id}
          position={frame.position}
          label={frame.label}
        />
      ))}
    </group>
  )
}

export default FrameGalleryArea
