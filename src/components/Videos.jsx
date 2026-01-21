import { useState } from 'react'
import './Videos.css'

const videos = [
  {
    id: 1,
    title: 'Трейлер',
    description: 'Официальный трейлер игры',
    thumbnail: '/videos/trailer-thumb.jpg',
    videoUrl: '/videos/trailer.mp4'
  },
  {
    id: 2,
    title: 'Геймплейное видео',
    description: 'Демонстрация игрового процесса',
    thumbnail: '/videos/devlog-thumb.jpg',
    videoUrl: '/videos/devlog.mp4'
  }
]

const Videos = () => {
  const [playingVideo, setPlayingVideo] = useState(null)

  const handleVideoClick = (video) => {
    setPlayingVideo(video)
  }

  return (
    <section id="videos" className="section videos">
      <h2 className="section-title">Видео разработки</h2>
      <p className="section-subtitle">Следите за процессом создания игры</p>

      <div className="videos-grid">
        {videos.map((video) => (
          <div 
            key={video.id}
            className="video-card"
            onClick={() => handleVideoClick(video)}
          >
            <div 
              className="video-thumbnail"
              data-has-thumbnail={video.thumbnail ? "true" : "false"}
            >
              <div className="video-overlay">
                <div className="play-button">▶</div>
              </div>
              <div 
                className="video-bg"
                style={video.thumbnail ? {
                  backgroundImage: `url(${video.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}
              ></div>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {playingVideo && (
        <div className="video-modal" onClick={() => setPlayingVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setPlayingVideo(null)}>×</button>
            <h3>{playingVideo.title}</h3>
            <div className="video-player">
              <video 
                controls 
                autoPlay
                poster={playingVideo.thumbnail}
                className="video-element"
              >
                <source src={playingVideo.videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
            <p className="video-description">{playingVideo.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Videos
