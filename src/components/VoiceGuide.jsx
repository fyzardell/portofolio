import { useState, useEffect, useRef, useCallback } from 'react'
import './VoiceGuide.css'

const content = {
  id: [
    { id: 'home', label: 'Beranda', text: 'Hai! Ini portofolio-nya Faeyza Ardellein Yaradhitya, atau dipanggil Pija. Di sini kamu bisa lihat skill, project, dan cara hubungin dia. Yuk mulai!' },
    { id: 'about', label: 'Tentang', text: 'Pija itu mahasiswa Informatika yang suka banget ngulik teknologi, dari web development sampe data analysis. Dia juga suka menyelesaikan masalah lewat coding.' },
    { id: 'skills', label: 'Skill', text: 'Ini skill yang udah dikuasain Pija. Ada HTML, CSS, JavaScript, Python, Data Analysis, dan Git. Plus soft skill kayak problem solving dan team collaboration.' },
    { id: 'projects', label: 'Project', text: 'Beberapa project Pija: game 3D Multiplayer Snake Ladder, Data Analysis tentang perbandingan perceraian di Indonesia, dan Hifzhly, aplikasi AI buat menghafal Al-Quran.' },
    { id: 'ambassador', label: 'Ambassador', text: 'Pija juga Google Student Ambassador. Dia aktif ngadain event teknologi dan sharing ilmu sama mahasiswa lain di kampusnya.' },
    { id: 'contact', label: 'Kontak', text: 'Mau ngobrol atau kerja sama? Hubungin Pija lewat form di sini atau lewat email dan media sosialnya. Ditunggu ya!' },
  ],
  en: [
    { id: 'home', label: 'Home', text: 'Hi! This is Faeyza Ardellein Yaradhitya\'s portfolio, or you can call her Pija. Here you can see her skills, projects, and how to reach her. Let\'s go!' },
    { id: 'about', label: 'About', text: 'Pija is an Informatics student who loves exploring technology, from web development to data analysis. She also enjoys solving problems through coding.' },
    { id: 'skills', label: 'Skills', text: 'These are Pija\'s skills. She knows HTML, CSS, JavaScript, Python, Data Analysis, and Git. Plus soft skills like problem solving and team collaboration.' },
    { id: 'projects', label: 'Projects', text: 'Some of Pija\'s projects: a 3D Multiplayer Snake Ladder game, Data Analysis on divorce rates in Indonesia, and Hifzhly, an AI app for Quran memorization.' },
    { id: 'ambassador', label: 'Ambassador', text: 'Pija is also a Google Student Ambassador. She organizes tech events and shares knowledge with fellow students on campus.' },
    { id: 'contact', label: 'Contact', text: 'Want to chat or collaborate? Reach Pija through the form here, or via email and social media. She\'s waiting to hear from you!' },
  ],
}

export default function VoiceGuide() {
  const [lang, setLang] = useState(() => localStorage.getItem('vg-lang') || 'id')
  const [on, setOn] = useState(() => localStorage.getItem('vg-on') === 'true')
  const [active, setActive] = useState(null)
  const [speaking, setSpeaking] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const synthRef = useRef(window.speechSynthesis)
  const lastSpoken = useRef(null)

  useEffect(() => { localStorage.setItem('vg-lang', lang) }, [lang])
  useEffect(() => { localStorage.setItem('vg-on', on) }, [on])

  const speak = useCallback((text) => {
    synthRef.current?.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'id' ? 'id-ID' : 'en-US'
    u.rate = 1.05
    u.pitch = 1.05
    u.onstart = () => setSpeaking(true)
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    synthRef.current?.speak(u)
  }, [lang])

  const stop = useCallback(() => {
    synthRef.current?.cancel()
    setSpeaking(false)
  }, [])

  useEffect(() => {
    if (!on) return
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.4) {
          const id = e.target.id
          const list = content[lang]
          const item = list.find((x) => x.id === id)
          if (item && lastSpoken.current !== id) {
            lastSpoken.current = id
            setActive(item)
            setMinimized(false)
            speak(item.text)
          }
        }
      })
    }, { threshold: 0.4 })

    sections.forEach((s) => obs.observe(s))
    return () => { obs.disconnect(); stop() }
  }, [on, lang, speak, stop])

  const current = active || content[lang][0]

  return (
    <>
      {/* Widget */}
      <div className={`vg-widget ${on ? 'on' : ''}`}>
        <div className="vg-widget-bar" onClick={() => on && setMinimized(!minimized)}>
          <svg className="vg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          <span className="vg-widget-label">{on ? (current?.label || 'Guide') : 'Guide'}</span>
          {on && speaking && <span className="vg-speak-dot" />}
        </div>

        {!minimized && on && (
          <div className="vg-widget-body">
            <div className="vg-widget-row">
              <button className="vg-sm-btn" onClick={() => { setLang(lang === 'id' ? 'en' : 'id'); lastSpoken.current = null }}>
                {lang === 'id' ? 'EN' : 'ID'}
              </button>
              <button className="vg-sm-btn" onClick={() => {
                if (speaking) stop()
                else if (active) speak(active.text)
              }}>
                {speaking ? '⏸' : '▶'}
              </button>
              <button className="vg-sm-btn" onClick={() => { setOn(false); stop() }}>
                ✕
              </button>
            </div>
            {active && (
              <p className="vg-widget-text">{active.text}</p>
            )}
          </div>
        )}
      </div>

      {/* Turn on button (when off) */}
      {!on && (
        <button className="vg-fab" onClick={() => { setOn(true); lastSpoken.current = null }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>
      )}
    </>
  )
}
