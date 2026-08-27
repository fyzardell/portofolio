import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left reveal">
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Turning curiosity into{' '}
              <span className="text-gradient">meaningful work</span>
            </h2>
            <p className="about-text">
              I am an Informatics student with a strong interest in technology,
              particularly in web development and data analysis. I enjoy working
              on projects that combine technical problem-solving with practical
              outcomes that make a difference.
            </p>
            <p className="about-text">
              Over time, I have developed skills across multiple areas, from
              building responsive web applications to analyzing complex datasets
              and creating visualizations. I am always looking for opportunities
              to learn, collaborate, and contribute to impactful projects.
            </p>
            <p className="about-text">
              Currently seeking opportunities to grow as a developer and
              contribute to teams that value innovation and continuous improvement.
            </p>

            <div className="about-tags">
              <div className="about-tag tag-pink">
                <i className="fa-solid fa-graduation-cap" />
                <span>Informatics Student</span>
              </div>
              <div className="about-tag tag-purple">
                <i className="fa-solid fa-location-dot" />
                <span>Indonesia</span>
              </div>
              <div className="about-tag tag-rose">
                <i className="fa-solid fa-code" />
                <span>Developer</span>
              </div>
              <div className="about-tag tag-pink">
                <i className="fa-solid fa-chart-line" />
                <span>Data Analyst</span>
              </div>
            </div>
          </div>

          <div className="about-right reveal">
            <div className="about-card">
              <div className="card-header">
                <div className="card-dots">
                  <span className="cd-dot red" />
                  <span className="cd-dot yellow" />
                  <span className="cd-dot green" />
                </div>
                <span className="card-filename">about.js</span>
              </div>
              <div className="card-body">
                <div className="code-line">
                  <span className="ln">1</span>
                  <span className="kw">const</span> <span className="vr">developer</span> = {'{'}
                </div>
                <div className="code-line ind">
                  <span className="ln">2</span>
                  name: <span className="st">"Faeyza Ardellein"</span>,
                </div>
                <div className="code-line ind">
                  <span className="ln">3</span>
                  title: <span className="st">"Informatics Student"</span>,
                </div>
                <div className="code-line ind">
                  <span className="ln">4</span>
                  university: <span className="st">"Sultan Ageng Tirtayasa"</span>,
                </div>
                <div className="code-line ind">
                  <span className="ln">5</span>
                  skills: [<span className="st">"Web Dev"</span>,{' '}
                  <span className="st">"Data Analysis"</span>,{' '}
                  <span className="st">"Python"</span>],
                </div>
                <div className="code-line ind">
                  <span className="ln">6</span>
                  languages: [<span className="st">"Indonesian"</span>,{' '}
                  <span className="st">"English"</span>],
                </div>
                <div className="code-line ind">
                  <span className="ln">7</span>
                  interests: [<span className="st">"AI"</span>,{' '}
                  <span className="st">"Open Source"</span>,{' '}
                  <span className="st">"Education"</span>],
                </div>
                <div className="code-line ind">
                  <span className="ln">8</span>
                  status: <span className="st">"Open to opportunities"</span>,
                </div>
                <div className="code-line">
                  <span className="ln">9</span>
                  {'}'};
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
