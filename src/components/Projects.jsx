import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    image: '/game.png',
    category: 'Unity & C#',
    title: '3D Multiplayer Snake & Ladder',
    description: 'A 3D multiplayer board game built with Unity and C#. Features real-time dice rolling, turn-based gameplay, and a space-themed environment with interactive board elements.',
    tags: ['Unity', 'C#', '3D'],
    link: null,
    featured: true,
  },
  {
    image: '/grafik.png',
    category: 'Data Analysis',
    title: 'Divorce Ratio Analysis',
    description: 'Statistical analysis and visualization of divorce ratio distribution across all 34 Indonesian provinces. Includes bar charts, data interpretation, and trend identification.',
    tags: ['R', 'Visualization', 'Statistics'],
    link: 'https://rpubs.com/faeyzardell/1408133',
    featured: false,
  },
  {
    image: '/hifzhly.png',
    category: 'AI & Web Development',
    title: 'Hifzhly - AI Quran Assistant',
    description: 'An AI-powered platform with voice recognition technology for real-time Al-Quran memorization tracking, pronunciation correction, and progress monitoring.',
    tags: ['AI', 'Voice Recognition', 'Web'],
    link: 'https://hafizhly.kesug.com/?i=1',
    featured: false,
  },
]

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-grid', start: 'top 88%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <div className="projects-header reveal">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Featured <span className="text-gradient">work</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects demonstrating my skills across different technologies and domains.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`project-card ${project.featured ? 'project-featured' : ''}`}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-view">
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                      <span>View Project</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
