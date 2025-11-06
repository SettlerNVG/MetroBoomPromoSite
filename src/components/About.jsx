import './About.css'

const About = () => {
  return (
    <section id="about" className="section about">
      <h2 className="section-title">О проекте</h2>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon orange-bg">🎮</div>
          <h3>Жанр</h3>
          <p>Приключенческая игра от третьего лица на двоих, платформер</p>
        </div>

        <div className="about-card">
          <div className="about-icon cyan-bg">👥</div>
          <h3>Референсы</h3>
          <p>It Takes Two, A Way Out</p>
        </div>
      </div>

      <div className="description-card">
        <h3>Описание</h3>
        <p>
          Metro Boom - это захватывающая кооперативная игра, где два игрока вместе исследуют 
          подземный мир метро. Решайте головоломки, преодолевайте препятствия и работайте в команде, 
          чтобы пройти все уровни. Игра создана на Unreal Engine 5 с потрясающей графикой и атмосферой.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-item">
          <div className="feature-icon">🎯</div>
          <h4>Кооперативный геймплей</h4>
          <p>Играйте вместе с другом локально или онлайн</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🌆</div>
          <h4>Атмосферный мир</h4>
          <p>Исследуйте детализированный подземный мир метро</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🧩</div>
          <h4>Головоломки</h4>
          <p>Решайте сложные задачи, требующие командной работы</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⚡</div>
          <h4>Unreal Engine 5</h4>
          <p>Потрясающая графика и производительность</p>
        </div>
      </div>
    </section>
  )
}

export default About
