import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"

const generateParticles = (width, length) => {
  const numPoints = width * length

  const positions = new Float32Array(numPoints * 3)
  const colors = new Float32Array(numPoints * 3)

  //* Handle the colors
  const colorHigh = new THREE.Color("#4DE7DA")
  const colorLow = new THREE.Color("#5B7FE9")

  let k = 0

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      const u = i / width
      const v = j / length

      const x = u - 0.5
      const y = (Math.sin(u * Math.PI * 10) + Math.sin(v * Math.PI * 6)) / 20
      const z = v - 0.5

      positions[3 * k] = x
      positions[3 * k + 1] = y
      positions[3 * k + 2] = z

      //* Color
      const mixedColor = colorHigh.clone()
      mixedColor.lerp(colorLow, u)

      colors[k * 3 + 0] = mixedColor.r
      colors[k * 3 + 1] = mixedColor.g
      colors[k * 3 + 2] = mixedColor.b

      k++
    }
  }

  return { positions, colors }
}

const Points = () => {
  const mesh = useRef()
  const [particleTexture] = useLoader(THREE.TextureLoader, ["particle.png"])

  const { positions, colors } = generateParticles(200, 200)

  useFrame(({ clock, camera, mouse }) => {
    camera.position.y = mouse.y + 1.5
    camera.position.z = mouse.x
    camera.lookAt(mesh.current.position)
    mesh.current.rotation.y = clock.elapsedTime / 10
  })

  return (
    <points ref={mesh} scale={[20, 10, 20]}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={colors.length}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach='material'
        size={0.1}
        vertexColors={true}
        transparent
        alphaTest={0.001}
        alphaMap={particleTexture}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default Points
