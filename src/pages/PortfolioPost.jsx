import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import VideoPlayer from '../components/VideoPlayer'
import { getPosts } from '../utils/api'
import { getGoogleDriveImageUrl } from '../utils/helpers'
import './PortfolioPost.css'

function PortfolioPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    try {
      const posts = await getPosts()
      const foundPost = posts.find(p => p.id === parseInt(id))
      setPost(foundPost)
    } catch (error) {
      console.error('Error loading post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="post-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="post-page">
        <div className="container">
          <div className="empty-state card">
            <h3>Post not found</h3>
            <button onClick={() => navigate('/portfolio')}>Back to Portfolio</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="post-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/portfolio')}>
          ← Back to Portfolio
        </button>
        
        <article className="post-detail card">
          {post.cover_image && (
            <div className="post-detail-cover">
              <img src={getGoogleDriveImageUrl(post.cover_image)} alt={post.title} />
            </div>
          )}
          
          <div className="post-detail-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-date">
                {format(new Date(post.created_at), 'MMMM dd, yyyy')}
              </span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="post-detail-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>

          {post.images && post.images.length > 0 && (
            <div className="post-gallery">
              <h3>Gallery</h3>
              <div className="gallery-grid">
                {post.images.map((img, i) => (
                  <img key={i} src={getGoogleDriveImageUrl(img)} alt={`${post.title} ${i + 1}`} />
                ))}
              </div>
            </div>
          )}

          {post.videos && post.videos.length > 0 && (
            <div className="post-videos">
              <h3>Videos</h3>
              {post.videos.map((video, i) => (
                <VideoPlayer key={i} url={video} title={`${post.title} - Video ${i + 1}`} />
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export default PortfolioPost
