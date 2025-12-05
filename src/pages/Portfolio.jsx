import { useState, useEffect } from 'react'
import Timeline from '../components/Timeline'
import { getPosts } from '../utils/api'
import './Portfolio.css'

function Portfolio() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="portfolio-page">
      <div className="page-header">
        <h1>Portfolio</h1>
        <p>Explore my journey through technology, education, and innovation</p>
      </div>
      <div className="container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading portfolio...</p>
          </div>
        ) : posts.length > 0 ? (
          <Timeline posts={posts} />
        ) : (
          <div className="empty-state card">
            <h3>No posts yet</h3>
            <p>Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portfolio
