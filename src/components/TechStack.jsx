import './TechStack.css'

const techs = [
  { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#e34c26' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e' },
  { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
  { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#f05032' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: '#333' },
  { name: 'React', icon: 'fa-brands fa-react', color: '#61dafb' },
  { name: 'R', icon: 'fa-solid fa-chart-bar', color: '#276dc3' },
]

export default function TechStack() {
  return (
    <section className="techstack">
      <div className="container">
        <div className="techstack-track reveal">
          <div className="techtrack-inner">
            {[...techs, ...techs].map((tech, i) => (
              <div key={`${tech.name}-${i}`} className="tech-item">
                <i className={tech.icon} style={{ color: tech.color }} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
