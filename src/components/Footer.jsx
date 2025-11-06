import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-icon">🎮</span>
          <span className="footer-text">Metro Boom</span>
        </div>
        <div className="footer-center">
          <p>© {currentYear} Все права защищены</p>
        </div>
        <div className="footer-right">
          <p>Сделано на Unreal Engine 5</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
