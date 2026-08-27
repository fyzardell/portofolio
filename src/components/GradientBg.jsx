import { useRef, useEffect, memo } from 'react'
import './GradientBg.css'

const GradientBg = memo(function GradientBg({
  colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#f43f5e'],
  speed = 1.0,
  blur = 60,
  className = '',
}) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0

    function handleResize() {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    function hexToRgb(hex) {
      const h = hex.replace('#', '')
      const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
      const num = parseInt(full, 16)
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      }
    }

    const rgbColors = colors.slice(0, 4).map(hexToRgb)

    // Define floating fluid gradient blobs
    const blobs = rgbColors.map((col, idx) => {
      const angle = (idx / rgbColors.length) * Math.PI * 2
      return {
        col,
        baseX: 0.5 + Math.cos(angle) * 0.25,
        baseY: 0.5 + Math.sin(angle) * 0.25,
        radius: 0.45 + (idx % 2) * 0.1,
        speedX: (0.3 + (idx % 3) * 0.2) * (idx % 2 === 0 ? 1 : -1),
        speedY: (0.25 + (idx % 2) * 0.2) * (idx % 3 === 0 ? 1 : -1),
        phase: idx * 1.5,
      }
    })

    let startTime = performance.now()
    let lastFrame = 0

    function render(now) {
      animFrameRef.current = requestAnimationFrame(render)

      if (now - lastFrame < 32) return
      lastFrame = now

      const time = (now - startTime) * 0.001 * speed

      ctx.clearRect(0, 0, width, height)

      blobs.forEach((b) => {
        const x = (b.baseX + Math.sin(time * b.speedX + b.phase) * 0.22) * width
        const y = (b.baseY + Math.cos(time * b.speedY + b.phase) * 0.22) * height
        const r = b.radius * Math.max(width, height)

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0, `rgba(${b.col.r}, ${b.col.g}, ${b.col.b}, 0.65)`)
        grad.addColorStop(0.5, `rgba(${b.col.r}, ${b.col.g}, ${b.col.b}, 0.25)`)
        grad.addColorStop(1, `rgba(${b.col.r}, ${b.col.g}, ${b.col.b}, 0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [colors, speed])

  return (
    <div className={`gradient-bg-wrapper ${className}`}>
      <canvas
        ref={canvasRef}
        className="gradient-bg-canvas"
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  )
})

export default GradientBg
