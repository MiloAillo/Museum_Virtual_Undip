import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function Effects() {
  return (
    <EffectComposer multisampling={8}>
      {/* Subtle bloom for lights and gold accents */}
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.SCREEN}
      />
    </EffectComposer>
  )
}

export default Effects
