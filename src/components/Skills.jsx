import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from './SpotlightCard'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'HTML5', icon: 'fa-brands fa-html5', level: 85, color: '#e34c26', desc: 'Semantic markup and accessible web structures' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt', level: 80, color: '#1572b6', desc: 'Responsive layouts, animations, and modern design' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', level: 70, color: '#f7df1e', desc: 'Interactive features and dynamic web applications' },
  { name: 'Python', icon: 'fa-brands fa-python', level: 65, color: '#3776ab', desc: 'Data processing, scripting, and automation' },
  { name: 'Data Analysis', icon: 'fa-solid fa-chart-bar', level: 75, color: '#ec4899', desc: 'Dataset exploration, visualization, and insights' },
  { name: 'Git & GitHub', icon: 'fa-brands fa-git-alt', level: 60, color: '#f05032', desc: 'Version control and collaborative development' },
]

const competencies = [
  { icon: 'fa-solid fa-lightbulb', title: 'Problem Solving', desc: 'Breaking down complex challenges into manageable solutions with systematic approaches' },
  { icon: 'fa-solid fa-users', title: 'Team Collaboration', desc: 'Working effectively with diverse teams on group projects and shared objectives' },
  { icon: 'fa-solid fa-book-open', title: 'Continuous Learning', desc: 'Exploring new technologies and methodologies to stay current in the field' },
  { icon: 'fa-solid fa-clock', title: 'Time Management', desc: 'Balancing academic responsibilities with personal projects and growth' },
]

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.spotlight-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1, y: 0,
          duration: 0.55, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 88%' },
        }
      )
      gsap.fromTo('.competency-item',
        { opacity: 0, x: -25 },
        {
          opacity: 1, x: 0,
          duration: 0.45, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.competency-grid', start: 'top 88%' },
        }
      )
      gsap.fromTo('.skill-bar-fill',
        { width: '0%' },
        {
          width: (i) => `${skills[i].level}%`,
          duration: 1, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 88%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <div className="skills-header reveal">
          <div className="section-label">Skills & Competencies</div>
          <h2 className="section-title">
            My technical <span className="text-gradient">skillset</span>
          </h2>
          <p className="section-subtitle">
            Technologies and soft skills developed through academic and personal projects.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <SpotlightCard key={skill.name} spotlightColor="rgba(236, 72, 153, 0.12)">
              <div className="skill-card-inner">
                <div className="skill-top">
                  <div className="skill-icon" style={{ color: skill.color }}>
                    <i className={skill.icon} />
                  </div>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{ background: skill.color, width: '0%' }} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div className="competency-section reveal">
          <h3 className="comp-title">Core Competencies</h3>
          <div className="competency-grid">
            {competencies.map((c) => (
              <div key={c.title} className="competency-item">
                <div className="comp-icon">
                  <i className={c.icon} />
                </div>
                <div>
                  <h4 className="comp-name">{c.title}</h4>
                  <p className="comp-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
