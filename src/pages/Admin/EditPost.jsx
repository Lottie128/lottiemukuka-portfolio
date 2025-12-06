import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPosts, updatePost } from '../../utils/api'
import './Admin.css'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: '',
    content: '',
    cover_image: '',
    images: '',
    videos: '',
    tags: ''
  })
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    try {
      const posts = await getPosts()
      const foundPost = posts.find(p => p.id === parseInt(id))
      if (foundPost) {
        setPost({
          id: foundPost.id,
          title: foundPost.title,
          content: foundPost.content,
          cover_image: foundPost.cover_image || '',
          images: foundPost.images ? foundPost.images.join('\n') : '',
          videos: foundPost.videos ? foundPost.videos.join('\n') : '',
          tags: foundPost.tags ? foundPost.tags.join(', ') : ''
        })
      }
    } catch (error) {
      console.error('Error loading post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const postData = {
      id: parseInt(id),
      title: post.title,
      content: post.content,
      cover_image: post.cover_image,
      images: post.images ? post.images.split('\n').filter(img => img.trim()) : [],
      videos: post.videos ? post.videos.split('\n').filter(vid => vid.trim()) : [],
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
    }

    try {
      await updatePost(postData)
      setSuccess(true)
      setTimeout(() => navigate('/admin/dashboard'), 2000)
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Edit Portfolio Post</h1>
          <p>Update your project or achievement</p>
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
                type="text"
                value={post.cover_image}
                onChange={(e) => setPost({...post, cover_image: e.target.value})}
                placeholder="https://example.com/cover-image.jpg OR Google Drive link"
              />
              <small>Can use regular URL or Google Drive/Photos public link</small>
            </div>

            <div className="form-group">
              <label>Additional Images (one URL per line)</label>
              <textarea
                value={post.images}
                onChange={(e) => setPost({...post, images: e.target.value})}
                placeholder="https://example.com/image1.jpg&#10;https://drive.google.com/file/d/FILE_ID/view"
                rows="4"
              />
              <small>Google Drive links will be automatically converted</small>
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

            {success && <div className="success-message">Post updated successfully!</div>}
            
            <div className="form-actions">
              <button type="submit">Update Post</button>
              <button type="button" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPost
