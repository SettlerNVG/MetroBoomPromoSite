import { useState } from 'react'
import './Downloads.css'

const downloadFiles = {
  build: {
    url: '/downloads/metro-boom-build.zip',
    filename: 'metro-boom-build.zip',
    size: 'Размер будет отображен после добавления файла'
  },
  source: {
    url: '/downloads/metro-boom-source.zip',
    filename: 'metro-boom-source.zip',
    size: 'Размер будет отображен после добавления файла'
  }
}

const Downloads = () => {
  const [downloading, setDownloading] = useState(null)

  const handleDownload = (type) => {
    const file = downloadFiles[type]
    
    // Проверяем, существует ли файл
    fetch(file.url, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // Файл существует, начинаем загрузку
          setDownloading(type)
          
          // Создаем временную ссылку для загрузки
          const link = document.createElement('a')
          link.href = file.url
          link.download = file.filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          setTimeout(() => {
            setDownloading(null)
          }, 2000)
        } else {
          // Файл не найден
          alert(`Файл ${file.filename} еще не загружен на сервер.\n\nПожалуйста, добавьте файл в папку public/downloads/`)
        }
      })
      .catch(() => {
        alert(`Файл ${file.filename} не найден.\n\nДобавьте файл в папку public/downloads/`)
      })
  }

  return (
    <section id="downloads" className="section downloads">
      <h2 className="section-title">Загрузки</h2>
      <p className="section-subtitle">Скачайте билд или исходные файлы проекта</p>

      <div className="downloads-grid">
        <div className="download-card orange">
          <div className="download-icon orange-bg">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </div>
          <h3>Скачать билд</h3>
          <p>Готовая сборка игры для Windows</p>
          <div className="download-info">
            <span className="file-format">📦 ZIP архив</span>
          </div>
          <button 
            className="download-btn orange-btn"
            onClick={() => handleDownload('build')}
            disabled={downloading === 'build'}
          >
            {downloading === 'build' ? '⬇️ Загрузка...' : '⬇️ Скачать билд'}
          </button>
        </div>

        <div className="download-card cyan">
          <div className="download-icon cyan-bg">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </div>
          <h3>Скачать исходники</h3>
          <p>Исходные файлы проекта UE5</p>
          <div className="download-info">
            <span className="file-format">📦 ZIP архив</span>
          </div>
          <button 
            className="download-btn cyan-btn"
            onClick={() => handleDownload('source')}
            disabled={downloading === 'source'}
          >
            {downloading === 'source' ? '⬇️ Загрузка...' : '⬇️ Скачать исходники'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Downloads
