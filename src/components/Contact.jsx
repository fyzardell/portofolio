import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [toast, setToast] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setToast(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="section-label">Contact</div>
            <h2 className="section-title">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="section-subtitle">
              Have a project in mind or want to discuss an opportunity?
              I would be happy to hear from you. Feel free to reach out
              through any of the channels below.
            </p>

            <div className="contact-details">
              <a href="mailto:faeyzaardellein@gmail.com" className="contact-item">
                <div className="contact-icon">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">faeyzaardellein@gmail.com</span>
                </div>
              </a>

              <a href="https://github.com/fyzardell" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">
                  <i className="fa-brands fa-github" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">GitHub</span>
                  <span className="contact-item-value">github.com/fyzardell</span>
                </div>
              </a>

              <a href="https://www.instagram.com/fyzardell/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">
                  <i className="fa-brands fa-instagram" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Instagram</span>
                  <span className="contact-item-value">@fyzardell</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/fyzardell" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">
                  <i className="fa-brands fa-linkedin-in" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">LinkedIn</span>
                  <span className="contact-item-value">linkedin.com/in/fyzardell</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper reveal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  rows="7"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast">
          <i className="fa-solid fa-check-circle" />
          <div>
            <strong>Message sent successfully</strong>
            <span>Thank you for reaching out. I will get back to you soon.</span>
          </div>
        </div>
      )}
    </section>
  )
}
