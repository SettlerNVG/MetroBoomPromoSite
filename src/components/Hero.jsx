import { useState, useEffect } from 'react'
import './Hero.css'

const Hero = () => {
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    // Проверяем наличие фонового изображения
    const img = new Image()
    img.src = '/images/backgrounds/hero-bg.jpg'
    img.onload = () => setHasImage(true)
    img.onerror = () => setHasImage(false)
  }, [])

  return (
    <section className={`hero ${hasImage ? 'hero-with-image' : ''}`}>
      <div className="hero-content">
        <h1 className="hero-title">Metro Boom</h1>
        <p className="hero-subtitle">Кооперативная приключенческая игра на Unreal Engine 5</p>
        <p className="hero-description">
          Два персонажа. Одна встреча. Бесконечные приключения в подземном мире метро.
        </p>
        <div className="hero-buttons">
          <button className="hero-btn primary" onClick={() => {
            document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Скачать игру
          </button>
          <button className="hero-btn secondary" onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Узнать больше
          </button>
        </div>
      </div>
      <div className="hero-background"></div>
    </section>
  )
}

export default Hero
