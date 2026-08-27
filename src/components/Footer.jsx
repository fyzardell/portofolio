import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-logo">
            <span className="logo-text">Faeyza</span>
          </span>
          <p className="footer-text">
            Informatics student passionate about technology and creating
            meaningful solutions.
          </p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/fyzardell" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://www.instagram.com/fyzardell/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="mailto:faeyzaardellein@gmail.com">
            <i className="fa-solid fa-envelope" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} Faeyza Ardellein. All rights reserved.</span>
          <span className="footer-note">Built with React &amp; Vite</span>
        </div>
      </div>
    </footer>
  )
}
