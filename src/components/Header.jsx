import { useState } from 'react'
import './Header.css'

const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-icon">🎮</span>
          <span className="logo-text">Metro Boom</span>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('downloads')}>Загрузки</button>
          <button onClick={() => scrollToSection('team')}>Команда</button>
          <button onClick={() => scrollToSection('videos')}>Видео</button>
          <button onClick={() => scrollToSection('about')}>О проекте</button>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
