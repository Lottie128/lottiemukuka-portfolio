import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../../utils/api'
import './Admin.css'

function CreateCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
    videos: [{ title: '', url: '' }]
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

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
      ...course,
      videos: course.videos.filter(v => v.url.trim()),
      created_at: new Date().toISOString()
    }

    try {
      await createCourse(courseData)
      setSuccess(true)
      setTimeout(() => navigate('/admin/dashboard'), 2000)
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Failed to create course')
    }
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Create Course</h1>
          <p>Add a new educational course with video lessons</p>
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
                type="url"
                value={course.thumbnail}
                onChange={(e) => setCourse({...course, thumbnail: e.target.value})}
                placeholder="https://example.com/course-thumbnail.jpg"
              />
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
                    type="url"
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

            {success && <div className="success-message">Course created successfully!</div>}
            
            <div className="form-actions">
              <button type="submit">Publish Course</button>
              <button type="button" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
