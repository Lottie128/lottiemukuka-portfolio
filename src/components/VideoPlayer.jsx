import { useState } from 'react'
import './VideoPlayer.css'

function VideoPlayer({ url, title }) {
  const [playing, setPlaying] = useState(false)

  const getEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null
    
    // Google Drive direct video link
    const driveMatch = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
    const idMatch = videoUrl.match(/id=([a-zA-Z0-9_-]+)/)
    const fileId = driveMatch?.[1] || idMatch?.[1]
    
    if (fileId) {
      return `https://drive.google.com/uc?id=${fileId}`
    }
    
    return videoUrl
  }

  const embedUrl = getEmbedUrl(url)

  return (
    <div className="video-player">
      <video
        src={embedUrl}
        controls
        className="video-element"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={embedUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {title && <p className="video-title">{title}</p>}
    </div>
  )
}

export default VideoPlayer
