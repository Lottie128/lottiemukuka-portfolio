import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import './Timeline.css'

function Timeline({ posts }) {
  const getExcerpt = (content, maxLength = 150) => {
    const text = content.replace(/<[^>]*>/g, '')
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="timeline">
      {posts.map((post, index) => (
        <div key={post.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="timeline-marker"></div>
          <Link to={`/portfolio/${post.id}`} className="timeline-link">
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
              <div className="post-excerpt">
                <p>{getExcerpt(post.content)}</p>
                <span className="read-more">Read more →</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Timeline
