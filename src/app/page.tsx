'use client'

import * as THREE from 'three'
import { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Home(): JSX.Element {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = true

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5).normalize()
    scene.add(directionalLight)

    const loader = new GLTFLoader()
    loader.load(
      '/wishing-well.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        scene.add(model)
      },
      undefined,
      (error: ErrorEvent) => {
        console.error('An error happened', error)
      }
    )

    camera.position.z = 50
    camera.position.y = 30
    camera.position.x = 30

    function animate(): void {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      renderer.dispose()
      controls.dispose()
      document.body.removeChild(renderer.domElement)
    }
  }, [])

  return <main></main>
}
