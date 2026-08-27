import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SplitText({
  text,
  className = '',
  delay = 40,
  duration = 0.8,
  tag = 'p',
  textAlign = 'left',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !text) return

    const chars = text.split('').map((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(30px)'
      return span
    })

    el.textContent = ''
    chars.forEach((c) => el.appendChild(c))

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out',
      stagger: delay / 1000,
    })

    return () => {
      tl.kill()
    }
  }, [text, delay, duration])

  const Tag = tag

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ textAlign, overflow: 'hidden' }}
    />
  )
}
