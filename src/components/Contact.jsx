import { useState } from 'react'
import './Contact.css'

const RECIPIENT = 'faeyzaardellein@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'success'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(
      `Hi Faeyza,\n\nYou have a new message from your portfolio website.\n\n` +
      `Name    : ${form.name}\n` +
      `Email   : ${form.email}\n\n` +
      `Message :\n${form.message}\n\n` +
      `---\nSent via portfolio contact form`
    )

    // Open visitor's email client with form data pre-filled
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`

    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4500)
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

              <a href="https://www.linkedin.com/in/faeyza-ardellein-yaradhitya-053a0b431/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">
                  <i className="fa-brands fa-linkedin-in" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">LinkedIn</span>
                  <span className="contact-item-value">linkedin.com/in/faeyza-ardellein-yaradhitya-053a0b431</span>
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

      {status === 'success' && (
        <div className="toast toast-success">
          <i className="fa-solid fa-circle-check" />
          <div>
            <strong>Opening your email app</strong>
            <span>Your message is ready — just hit Send in your email client!</span>
          </div>
        </div>
      )}
    </section>
  )
}
