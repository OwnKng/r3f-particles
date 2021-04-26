import React, { Suspense } from "react"
import Points from "./Points"
import { Canvas } from "@react-three/fiber"
import "./styles.css"
import { NoToneMapping } from "three/src/Three"

export default function App() {
  return (
    <Canvas
      camera={{ fov: 75, position: [6, 1.2, 6] }}
      onCreated={({ gl }) => {
        gl.toneMapping = NoToneMapping
      }}
    >
      <Suspense fallback={null}>
        <color attach='background' args={["#151B26"]} />
        <Points />
      </Suspense>
    </Canvas>
  )
}
