import { useState, useEffect } from 'react'
import './RotatingText.css'

export default function RotatingText({
  words = [],
  className = '',
  interval = 2500,
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={`rotating-text ${className}`}>
      {words.map((word, i) => (
        <span
          key={word}
          className={`rotating-word ${i === index ? 'active' : ''}`}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
