'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react'
import * as THREE from 'three'

import { cn } from '#/lib/utils'

type WaterRippleEffectProps = {
  imageAlt?: string
  imageClassName?: string
  waveIntensity?: number
  rippleIntensity?: number
  animationSpeed?: number
  hoverRippleMultiplier?: number
  transitionSpeed?: number
  waveFrequency?: number
  rippleFrequency?: number
  distortionAmount?: number
  onHover?: () => void
  onLeave?: () => void
  imageSrc: string
} & ComponentPropsWithoutRef<'div'>

export function WaterRippleEffect({
  imageSrc,
  imageAlt = '',
  className,
  imageClassName,
  waveIntensity = 0.006,
  rippleIntensity = 0.012,
  animationSpeed = 1,
  hoverRippleMultiplier = 4,
  transitionSpeed = 0.08,
  waveFrequency = 10,
  rippleFrequency = 20,
  distortionAmount = 0.008,
  onHover,
  onLeave,
  ...props
}: WaterRippleEffectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
  const isHoveredRef = useRef(false)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const clickOriginRef = useRef({ x: 0.5, y: 0.5 })
  const clickPulseRef = useRef(0)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isInteractiveReady, setIsInteractiveReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotionPreference = () => {
      setIsReducedMotion(media.matches)
    }

    syncMotionPreference()
    media.addEventListener('change', syncMotionPreference)

    return () => {
      media.removeEventListener('change', syncMotionPreference)
    }
  }, [])

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const nextWidth = Math.round(entry.contentRect.width)
      const nextHeight = Math.round(entry.contentRect.height)

      setSize((current) => {
        if (
          current.width === nextWidth &&
          current.height === nextHeight
        ) {
          return current
        }

        return {
          width: nextWidth,
          height: nextHeight,
        }
      })
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const mountElement = canvasHostRef.current
    const rootElement = rootRef.current
    const { width, height } = size

    if (!mountElement || !rootElement || isReducedMotion) {
      setIsInteractiveReady(false)
      return
    }

    if (width < 2 || height < 2) {
      setIsInteractiveReady(false)
      return
    }

    let scene: THREE.Scene | null = null
    let camera: THREE.OrthographicCamera | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let material: THREE.ShaderMaterial | null = null
    let geometry: THREE.PlaneGeometry | null = null
    let texture: THREE.Texture | null = null
    let isDisposed = false
    let handlePointerMove: ((event: PointerEvent) => void) | undefined
    let handlePointerEnter: ((event: PointerEvent) => void) | undefined
    let handlePointerLeave: (() => void) | undefined
    let handlePointerDown: ((event: PointerEvent) => void) | undefined

    try {
      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        precision: 'highp',
      })

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.className = 'size-full'
      mountElement.appendChild(renderer.domElement)

      const textureLoader = new THREE.TextureLoader()
      textureLoader.setCrossOrigin('anonymous')

      texture = textureLoader.load(
        imageSrc,
        (loadedTexture: THREE.Texture) => {
          loadedTexture.colorSpace = THREE.SRGBColorSpace
          loadedTexture.magFilter = THREE.LinearFilter
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter
          loadedTexture.wrapS = THREE.ClampToEdgeWrapping
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping
          loadedTexture.generateMipmaps = true
          loadedTexture.needsUpdate = true
          const image = loadedTexture.source.data as
            | { width?: number; height?: number }
            | undefined
          if (image?.width && image?.height && material) {
            material.uniforms.imageAspect.value = image.width / image.height
          }
          setIsInteractiveReady(true)
        },
        undefined,
        () => {
          setIsInteractiveReady(false)
        },
      )

      material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          animationSpeed: { value: animationSpeed },
          clickOrigin: { value: new THREE.Vector2(0.5, 0.5) },
          clickPulse: { value: 0 },
          distortionAmount: { value: distortionAmount },
          hoverIntensity: { value: 0.3 },
          imageAspect: { value: width / height },
          mouse: { value: new THREE.Vector2(0.5, 0.5) },
          planeAspect: { value: width / height },
          rippleFrequency: { value: rippleFrequency },
          rippleIntensity: { value: rippleIntensity },
          texture1: { value: texture },
          time: { value: 0 },
          waveFrequency: { value: waveFrequency },
          waveIntensity: { value: waveIntensity },
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D texture1;
          uniform float time;
          uniform vec2 mouse;
          uniform vec2 clickOrigin;
          uniform float clickPulse;
          uniform float hoverIntensity;
          uniform float waveIntensity;
          uniform float rippleIntensity;
          uniform float animationSpeed;
          uniform float waveFrequency;
          uniform float rippleFrequency;
          uniform float distortionAmount;
          uniform float planeAspect;
          uniform float imageAspect;
          varying vec2 vUv;

          vec2 coverUv(vec2 uv, float sourceAspect, float targetAspect) {
            vec2 adjustedUv = uv;

            if (targetAspect > sourceAspect) {
              float scale = sourceAspect / targetAspect;
              adjustedUv.y = uv.y * scale + (1.0 - scale) * 0.5;
            } else {
              float scale = targetAspect / sourceAspect;
              adjustedUv.x = uv.x * scale + (1.0 - scale) * 0.5;
            }

            return adjustedUv;
          }

          void main() {
            vec2 uv = coverUv(vUv, imageAspect, planeAspect);

            float waveScale = waveIntensity * 0.5;
            float wave1 = sin(uv.x * waveFrequency + time * animationSpeed * 2.0) * waveScale;
            float wave2 = sin(uv.y * (waveFrequency * 0.8) + time * animationSpeed * 1.5) * (waveScale * 0.8);
            float wave3 = sin((uv.x + uv.y) * (waveFrequency * 1.2) + time * animationSpeed * 2.5) * (waveScale * 0.3);

            float dist = distance(uv, mouse);
            float rippleScale = rippleIntensity * 0.7;
            float falloff = exp(-dist * 4.0);

            float mouseWave1 = sin(dist * rippleFrequency - time * animationSpeed * 4.0) *
              falloff * hoverIntensity * rippleScale;
            float mouseWave2 = sin(dist * (rippleFrequency * 0.75) - time * animationSpeed * 3.0) *
              falloff * hoverIntensity * (rippleScale * 0.6);

            float hoverRipple1 = sin(length(uv - mouse) * (rippleFrequency * 1.25) - time * animationSpeed * 5.0) *
              exp(-length(uv - mouse) * 5.0) * hoverIntensity * (rippleScale * 0.8);
            float hoverRipple2 = sin(length(uv - mouse) * (rippleFrequency * 0.9) - time * animationSpeed * 3.5) *
              exp(-length(uv - mouse) * 4.0) * hoverIntensity * (rippleScale * 0.6);

            float clickDist = distance(uv, clickOrigin);
            float clickRipple = sin(clickDist * (rippleFrequency * 1.5) - time * animationSpeed * 6.5) *
              exp(-clickDist * 6.5) * clickPulse * (rippleScale * 1.8);

            float totalWave = (wave1 + wave2 + wave3 + mouseWave1 + mouseWave2 + hoverRipple1 + hoverRipple2 + clickRipple) * 0.5;

            float distortScale = distortionAmount * 0.6;
            vec2 distortion = vec2(
              sin(uv.x * (waveFrequency * 0.8) + time * animationSpeed * 1.8) * distortScale * 0.4 +
              sin(uv.y * (waveFrequency * 0.6) + time * animationSpeed * 2.2) * distortScale * 0.3,
              sin(uv.y * (waveFrequency * 0.7) + time * animationSpeed * 1.6) * distortScale * 0.4 +
              sin(uv.x * (waveFrequency * 0.9) + time * animationSpeed * 2.0) * distortScale * 0.3
            );

            vec2 mouseDir = uv - mouse;
            float mouseDist = max(length(mouseDir), 0.0001);
            vec2 mouseDistortion = (mouseDir / mouseDist) *
              sin(mouseDist * rippleFrequency - time * animationSpeed * 4.0) *
              exp(-mouseDist * 4.0) * hoverIntensity * distortScale * 0.5;

            vec2 clickDir = uv - clickOrigin;
            float clickDistSafe = max(length(clickDir), 0.0001);
            vec2 clickDistortion = (clickDir / clickDistSafe) *
              sin(clickDistSafe * (rippleFrequency * 1.3) - time * animationSpeed * 6.0) *
              exp(-clickDistSafe * 6.0) * clickPulse * distortScale;

            vec2 finalDistortion = (distortion + mouseDistortion + clickDistortion) * 0.72 +
              vec2(totalWave * 0.2, totalWave * 0.2);

            vec2 distortedUv = clamp(uv + finalDistortion, 0.0, 1.0);
            vec4 color = texture2D(texture1, distortedUv);
            color.rgb *= 1.08;

            gl_FragColor = color;
          }
        `,
      })

      geometry = new THREE.PlaneGeometry(2, 2, 64, 64)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const updatePointer = (clientX: number, clientY: number) => {
        const rect = rootElement.getBoundingClientRect()
        const x = (clientX - rect.left) / rect.width
        const y = 1 - (clientY - rect.top) / rect.height

        mouseRef.current = {
          x: THREE.MathUtils.clamp(x, 0, 1),
          y: THREE.MathUtils.clamp(y, 0, 1),
        }
      }

      handlePointerMove = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY)
      }

      handlePointerEnter = (event: PointerEvent) => {
        isHoveredRef.current = true
        updatePointer(event.clientX, event.clientY)
        onHover?.()
      }

      handlePointerLeave = () => {
        isHoveredRef.current = false
        onLeave?.()
      }

      handlePointerDown = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY)
        clickOriginRef.current = { ...mouseRef.current }
        clickPulseRef.current = 1
      }

      rootElement.addEventListener('pointermove', handlePointerMove)
      rootElement.addEventListener('pointerenter', handlePointerEnter)
      rootElement.addEventListener('pointerleave', handlePointerLeave)
      rootElement.addEventListener('pointerdown', handlePointerDown)

      const animate = () => {
        if (!material || !renderer || !scene || !camera || isDisposed) return

        timeRef.current += 0.016
        clickPulseRef.current *= 0.92

        material.uniforms.time.value = timeRef.current
        material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y)
        material.uniforms.clickOrigin.value.set(
          clickOriginRef.current.x,
          clickOriginRef.current.y,
        )
        material.uniforms.clickPulse.value = clickPulseRef.current

        const targetIntensity = isHoveredRef.current
          ? hoverRippleMultiplier
          : 0.3
        const currentIntensity = material.uniforms.hoverIntensity.value

        material.uniforms.hoverIntensity.value +=
          (targetIntensity - currentIntensity) * transitionSpeed

        renderer.render(scene, camera)
        frameRef.current = window.requestAnimationFrame(animate)
      }

      frameRef.current = window.requestAnimationFrame(animate)
    } catch {
      setIsInteractiveReady(false)
    }

    return () => {
      isDisposed = true

      if (handlePointerMove) {
        rootElement.removeEventListener('pointermove', handlePointerMove)
      }
      if (handlePointerEnter) {
        rootElement.removeEventListener('pointerenter', handlePointerEnter)
      }
      if (handlePointerLeave) {
        rootElement.removeEventListener('pointerleave', handlePointerLeave)
      }
      if (handlePointerDown) {
        rootElement.removeEventListener('pointerdown', handlePointerDown)
      }

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }

      while (mountElement.firstChild) {
        mountElement.removeChild(mountElement.firstChild)
      }

      renderer?.dispose()
      geometry?.dispose()
      material?.dispose()
      texture?.dispose()
      setIsInteractiveReady(false)
    }
  }, [
    animationSpeed,
    distortionAmount,
    hoverRippleMultiplier,
    imageSrc,
    isReducedMotion,
    onHover,
    onLeave,
    rippleFrequency,
    rippleIntensity,
    size,
    transitionSpeed,
    waveFrequency,
    waveIntensity,
  ])

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative size-full overflow-hidden bg-card',
        className,
      )}
      {...props}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-300',
          isInteractiveReady && !isReducedMotion ? 'opacity-0' : 'opacity-100',
          imageClassName,
        )}
      />
      <div
        ref={canvasHostRef}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          isInteractiveReady && !isReducedMotion ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
