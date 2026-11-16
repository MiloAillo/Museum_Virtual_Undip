import { Canvas } from '@react-three/fiber'
import UnifiedMuseumScene from './components/unified/UnifiedMuseumScene'

function App() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, -3], fov: 75 }}
      style={{ background: '#0a0a0a' }}
      gl={{ 
        antialias: true,
        powerPreference: 'high-performance'
      }}
    >
      <UnifiedMuseumScene />
    </Canvas>
  )
}

export default App
