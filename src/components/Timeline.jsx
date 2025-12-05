import { format } from 'date-fns'
import VideoPlayer from './VideoPlayer'
import './Timeline.css'

function Timeline({ posts }) {
  const extractGoogleId = (url) => {
    if (!url) return null
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/)
    return driveMatch?.[1] || idMatch?.[1] || null
  }

  return (
    <div className="timeline">
      {posts.map((post, index) => (
        <div key={post.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="timeline-marker"></div>
          <div className="timeline-content card">
            {post.cover_image && (
              <div className="post-cover">
                <img src={post.cover_image} alt={post.title} />
              </div>
            )}
            <div className="post-header">
              <h3>{post.title}</h3>
              <span className="post-date">{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {post.images && post.images.length > 0 && (
              <div className="post-gallery">
                {post.images.map((img, i) => (
                  <img key={i} src={img} alt={`${post.title} ${i + 1}`} />
                ))}
              </div>
            )}
            {post.videos && post.videos.length > 0 && (
              <div className="post-videos">
                {post.videos.map((video, i) => (
                  <VideoPlayer key={i} url={video} title={`${post.title} - Video ${i + 1}`} />
                ))}
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline
