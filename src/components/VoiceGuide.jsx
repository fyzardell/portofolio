import { useState, useEffect, useRef, useCallback } from 'react'
import './VoiceGuide.css'

const content = {
  id: [
    { id: 'home', label: 'Beranda', text: 'Hai! Ini portofolio-nya Faeyza Ardellein Yaradhitya, atau dipanggil Pija. Di sini kamu bisa lihat skill, project, dan cara hubungin dia. Yuk mulai!' },
    { id: 'about', label: 'Tentang', text: 'Pija itu mahasiswa Informatika di Universitas Sultan Ageng Tirtayasa yang suka banget ngulik teknologi, dari web development sampe data analysis. Dia juga suka menyelesaikan masalah lewat coding.' },
    { id: 'skills', label: 'Skill', text: 'Ini skill yang udah dikuasain Pija. Ada HTML, CSS, JavaScript, Python, Data Analysis, dan Git. Plus soft skill kayak problem solving dan team collaboration.' },
    { id: 'projects', label: 'Project', text: 'Beberapa project Pija: game 3D Multiplayer Snake Ladder, Data Analysis tentang perbandingan perceraian di Indonesia, dan Hifzhly, aplikasi AI buat menghafal Al-Quran.' },
    { id: 'ambassador', label: 'Ambassador', text: 'Pija juga Google Student Ambassador. Dia aktif ngadain event teknologi dan sharing ilmu sama mahasiswa lain di kampusnya.' },
    { id: 'contact', label: 'Kontak', text: 'Mau ngobrol atau kerja sama? Hubungin Pija lewat form di sini atau lewat email dan media sosialnya. Ditunggu ya!' },
  ],
  en: [
    { id: 'home', label: 'Home', text: 'Hi! This is Faeyza Ardellein Yaradhitya\'s portfolio, or you can call her Pija. Here you can see her skills, projects, and how to reach her. Let\'s go!' },
    { id: 'about', label: 'About', text: 'Pija is an Informatics student at Sultan Ageng Tirtayasa University who loves exploring technology, from web development to data analysis. She also enjoys solving problems through coding.' },
    { id: 'skills', label: 'Skills', text: 'These are Pija\'s skills. She knows HTML, CSS, JavaScript, Python, Data Analysis, and Git. Plus soft skills like problem solving and team collaboration.' },
    { id: 'projects', label: 'Projects', text: 'Some of Pija\'s projects: a 3D Multiplayer Snake Ladder game, Data Analysis on divorce rates in Indonesia, and Hifzhly, an AI app for Quran memorization.' },
    { id: 'ambassador', label: 'Ambassador', text: 'Pija is also a Google Student Ambassador. She organizes tech events and shares knowledge with fellow students on campus.' },
    { id: 'contact', label: 'Contact', text: 'Want to chat or collaborate? Reach Pija through the form here, or via email and social media. She\'s waiting to hear from you!' },
  ],
}

function pickVoice(lang) {
  const voices = window.speechSynthesis?.getVoices() || []
  const tag = lang === 'id' ? 'id' : 'en'

  // Prefer female voices
  const femaleKeywords = ['female', 'woman', 'zira', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'veena', 'google']

  if (lang === 'id') {
    // Indonesian female voices
    const idVoices = voices.filter((v) => v.lang.startsWith('id'))
    const idFemale = idVoices.find((v) =>
      femaleKeywords.some((k) => v.name.toLowerCase().includes(k))
    )
    if (idFemale) return idFemale
    if (idVoices.length > 0) return idVoices[0]
    // Fallback to any Indonesian
    return voices.find((v) => v.name.includes('Indonesian') || v.lang.startsWith('id')) || null
  }

  // English - prefer female voices
  const enVoices = voices.filter((v) => v.lang.startsWith('en'))
  const preferredFemale = [
    'Google UK English Female',
    'Google US English',
    'Microsoft Zira',
    'Samantha',
    'Karen',
    'Victoria',
    'Moira',
    'Tessa',
    'Fiona',
  ]

  for (const name of preferredFemale) {
    const v = enVoices.find((v) => v.name.includes(name))
    if (v) return v
  }

  // Find any female english voice
  const enFemale = enVoices.find((v) =>
    femaleKeywords.some((k) => v.name.toLowerCase().includes(k))
  )
  if (enFemale) return enFemale

  return enVoices[0] || null
}

export default function VoiceGuide() {
  const [lang, setLang] = useState(() => localStorage.getItem('vg-lang') || 'id')
  const [on, setOn] = useState(() => localStorage.getItem('vg-on') === 'true')
  const [active, setActive] = useState(null)
  const [speaking, setSpeaking] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [voicesReady, setVoicesReady] = useState(false)
  const synthRef = useRef(window.speechSynthesis)
  const lastSpoken = useRef(null)
  const sectionOrder = useRef([])

  useEffect(() => { localStorage.setItem('vg-lang', lang) }, [lang])
  useEffect(() => { localStorage.setItem('vg-on', on) }, [on])

  useEffect(() => {
    const load = () => setVoicesReady(true)
    window.speechSynthesis?.addEventListener('voiceschanged', load)
    setVoicesReady(true)
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', load)
  }, [])

  useEffect(() => {
    sectionOrder.current = content[lang].map((c) => c.id)
  }, [lang])

  const speak = useCallback((text, onEnd) => {
    synthRef.current?.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const v = pickVoice(lang)
    if (v) u.voice = v
    u.lang = lang === 'id' ? 'id-ID' : 'en-US'
    u.rate = 1.0
    u.pitch = 1.15
    u.onstart = () => setSpeaking(true)
    u.onend = () => { setSpeaking(false); onEnd?.() }
    u.onerror = () => { setSpeaking(false); onEnd?.() }
    synthRef.current?.speak(u)
  }, [lang])

  const stop = useCallback(() => {
    synthRef.current?.cancel()
    setSpeaking(false)
  }, [])

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!on) return
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) {
          const id = e.target.id
          const list = content[lang]
          const item = list.find((x) => x.id === id)
          if (item && lastSpoken.current !== id) {
            lastSpoken.current = id
            setActive(item)
            setMinimized(false)
            if (autoScroll) scrollToSection(id)
            speak(item.text)
          }
        }
      })
    }, { threshold: 0.3 })

    sections.forEach((s) => obs.observe(s))
    return () => { obs.disconnect(); stop() }
  }, [on, lang, speak, stop, autoScroll, scrollToSection])

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
          {on && speaking && <span className="vg-speak-bars"><span /><span /><span /></span>}
        </div>

        {!minimized && on && (
          <div className="vg-widget-body">
            <div className="vg-widget-row">
              <button className="vg-sm-btn" onClick={(e) => { e.stopPropagation(); setLang(lang === 'id' ? 'en' : 'id'); lastSpoken.current = null }}>
                {lang === 'id' ? 'EN' : 'ID'}
              </button>
              <button className="vg-sm-btn" onClick={(e) => { e.stopPropagation(); if (speaking) stop(); else if (active) speak(active.text) }}>
                <i className={`fa-solid ${speaking ? 'fa-pause' : 'fa-play'}`} style={{ fontSize: '9px' }} />
              </button>
              <button className="vg-sm-btn" onClick={(e) => { e.stopPropagation(); setAutoScroll(!autoScroll) }} title="Auto scroll">
                <i className={`fa-solid ${autoScroll ? 'fa-arrows-up-down' : 'fa-arrow-right'}`} style={{ fontSize: '9px' }} />
              </button>
              <button className="vg-sm-btn" onClick={(e) => { e.stopPropagation(); setOn(false); stop() }}>
                <i className="fa-solid fa-xmark" style={{ fontSize: '10px' }} />
              </button>
            </div>
            {active && <p className="vg-widget-text">{active.text}</p>}
          </div>
        )}
      </div>

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
