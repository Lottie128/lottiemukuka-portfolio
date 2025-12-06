import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCourses, updateCourse } from '../../utils/api'
import './Admin.css'

function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState({
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
    videos: [{ title: '', url: '' }]
  })
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadCourse()
  }, [id])

  const loadCourse = async () => {
    try {
      const courses = await getCourses()
      const foundCourse = courses.find(c => c.id === parseInt(id))
      if (foundCourse) {
        setCourse({
          id: foundCourse.id,
          title: foundCourse.title,
          description: foundCourse.description,
          thumbnail: foundCourse.thumbnail || '',
          duration: foundCourse.duration || '',
          videos: foundCourse.videos && foundCourse.videos.length > 0 
            ? foundCourse.videos 
            : [{ title: '', url: '' }]
        })
      }
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const addVideo = () => {
    setCourse({
      ...course,
      videos: [...course.videos, { title: '', url: '' }]
    })
  }

  const updateVideo = (index, field, value) => {
    const newVideos = [...course.videos]
    newVideos[index][field] = value
    setCourse({ ...course, videos: newVideos })
  }

  const removeVideo = (index) => {
    const newVideos = course.videos.filter((_, i) => i !== index)
    setCourse({ ...course, videos: newVideos })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const courseData = {
      id: parseInt(id),
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      duration: course.duration,
      videos: course.videos.filter(v => v.url.trim())
    }

    try {
      await updateCourse(courseData)
      setSuccess(true)
      setTimeout(() => navigate('/admin/dashboard'), 2000)
    } catch (error) {
      console.error('Error updating course:', error)
      alert('Failed to update course')
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading course...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Edit Course</h1>
          <p>Update course details and video lessons</p>
        </div>

        <div className="form-card card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => setCourse({...course, title: e.target.value})}
                required
                placeholder="Robotics Fundamentals"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={course.description}
                onChange={(e) => setCourse({...course, description: e.target.value})}
                required
                placeholder="Course overview, what students will learn..."
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Thumbnail URL</label>
              <input
                type="text"
                value={course.thumbnail}
                onChange={(e) => setCourse({...course, thumbnail: e.target.value})}
                placeholder="https://example.com/course-thumbnail.jpg OR Google Drive link"
              />
              <small>Can use regular URL or Google Drive/Photos public link</small>
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={course.duration}
                onChange={(e) => setCourse({...course, duration: e.target.value})}
                placeholder="4 weeks, 10 hours, etc."
              />
            </div>

            <div className="form-group">
              <label>Course Videos</label>
              {course.videos.map((video, index) => (
                <div key={index} className="video-input">
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => updateVideo(index, 'title', e.target.value)}
                    placeholder="Lesson title"
                  />
                  <input
                    type="text"
                    value={video.url}
                    onChange={(e) => updateVideo(index, 'url', e.target.value)}
                    placeholder="Google Drive video URL"
                  />
                  {course.videos.length > 1 && (
                    <button type="button" onClick={() => removeVideo(index)} className="btn-remove">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addVideo} className="btn-add">+ Add Video</button>
            </div>

            {success && <div className="success-message">Course updated successfully!</div>}
            
            <div className="form-actions">
              <button type="submit">Update Course</button>
              <button type="button" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCourse
