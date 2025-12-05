import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../utils/api'
import './Admin.css'

function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    cover_image: '',
    images: '',
    videos: '',
    tags: ''
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const postData = {
      ...post,
      images: post.images ? post.images.split('\n').filter(img => img.trim()) : [],
      videos: post.videos ? post.videos.split('\n').filter(vid => vid.trim()) : [],
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : [],
      created_at: new Date().toISOString()
    }

    try {
      await createPost(postData)
      setSuccess(true)
      setTimeout(() => navigate('/admin/dashboard'), 2000)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    }
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Create Portfolio Post</h1>
          <p>Share your latest project or achievement</p>
        </div>

        <div className="form-card card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                required
                placeholder="Project or achievement title"
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({...post, content: e.target.value})}
                required
                placeholder="Describe your project, what you built, technologies used, impact..."
                rows="8"
              />
            </div>

            <div className="form-group">
              <label>Cover Image URL</label>
              <input
                type="url"
                value={post.cover_image}
                onChange={(e) => setPost({...post, cover_image: e.target.value})}
                placeholder="https://example.com/cover-image.jpg"
              />
            </div>

            <div className="form-group">
              <label>Additional Images (one URL per line)</label>
              <textarea
                value={post.images}
                onChange={(e) => setPost({...post, images: e.target.value})}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Video URLs from Google Drive (one per line)</label>
              <textarea
                value={post.videos}
                onChange={(e) => setPost({...post, videos: e.target.value})}
                placeholder="https://drive.google.com/file/d/FILE_ID/view&#10;https://drive.google.com/uc?id=FILE_ID"
                rows="4"
              />
              <small>Share video publicly on Google Drive and paste the link</small>
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                value={post.tags}
                onChange={(e) => setPost({...post, tags: e.target.value})}
                placeholder="robotics, AI, education, IoT"
              />
            </div>

            {success && <div className="success-message">Post created successfully!</div>}
            
            <div className="form-actions">
              <button type="submit">Publish Post</button>
              <button type="button" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
