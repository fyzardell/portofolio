import './GradientText.css'

export default function GradientText({
  children,
  className = '',
  colors = ['#ec4899', '#a855f7', '#ec4899'],
  speed = 4,
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(', ')})`

  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% auto',
        animationDuration: `${speed}s`,
      }}
    >
      {children}
    </span>
  )
}
