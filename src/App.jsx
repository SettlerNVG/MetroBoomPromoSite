import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Downloads from './components/Downloads'
import Team from './components/Team'
import Videos from './components/Videos'
import About from './components/About'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Header scrolled={scrolled} />
      <Hero />
      <main>
        <Downloads />
        <Team />
        <Videos />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
