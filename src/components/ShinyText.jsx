import './ShinyText.css'

export default function ShinyText({
  text,
  className = '',
  color = '#6b5b7b',
  shineColor = '#ec4899',
  speed = 3,
}) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        color,
        '--shine-color': shineColor,
        '--shine-speed': `${speed}s`,
      }}
    >
      {text}
    </span>
  )
}
