import GradientBg from './GradientBg'
import GradientText from './GradientText'
import './Ambassador.css'

export default function Ambassador() {
  return (
    <section id="ambassador" className="section ambassador">
      <div className="container">
        <div className="ambassador-card reveal">
          <div className="ambassador-card-bg">
            <GradientBg
              colors={['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#ec4899', '#a855f7']}
              speed={1.2}
              blur={70}
            />
          </div>

          <div className="ambassador-content">
            <div className="ambassador-top">
              <img
                src="/google-logo.svg"
                alt="Google Logo"
                className="ambassador-google-logo"
              />
              <span className="ambassador-label">Google Student Ambassador</span>
            </div>

            <h2 className="ambassador-title">
              <GradientText speed={4} colors={['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#ec4899']}>
                Aspiring Google Student Ambassador
              </GradientText>
            </h2>

            <p className="ambassador-text">
              The Google Student Ambassador Program is an opportunity for students to
              act as liaisons between Google and their universities. Ambassadors organize
              events, share knowledge about Google technologies, and help peers explore
              opportunities in tech.
            </p>

            <div className="ambassador-grid">
              <div className="amb-item">
                <div className="amb-icon-wrap">
                  <i className="fa-solid fa-calendar-check" />
                </div>
                <div>
                  <h4>Event Organization</h4>
                  <p>Plan and host tech workshops, hackathons, and study jams on campus</p>
                </div>
              </div>
              <div className="amb-item">
                <div className="amb-icon-wrap">
                  <i className="fa-solid fa-users" />
                </div>
                <div>
                  <h4>Community Building</h4>
                  <p>Foster a community of learners passionate about technology</p>
                </div>
              </div>
              <div className="amb-item">
                <div className="amb-icon-wrap">
                  <i className="fa-solid fa-lightbulb" />
                </div>
                <div>
                  <h4>Innovation Workshops</h4>
                  <p>Share knowledge about Google Cloud, Android, AI, and more</p>
                </div>
              </div>
              <div className="amb-item">
                <div className="amb-icon-wrap">
                  <i className="fa-solid fa-handshake" />
                </div>
                <div>
                  <h4>Industry Connection</h4>
                  <p>Bridge the gap between students and Google technologies</p>
                </div>
              </div>
            </div>

            <a
              href="https://buildyourfuture.withgoogle.com/programs/student-ambassador"
              target="_blank"
              rel="noopener noreferrer"
              className="ambassador-link"
            >
              <span>Learn About the Program</span>
              <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
