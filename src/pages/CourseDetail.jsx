import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import { getCourses } from '../utils/api'
import { getGoogleDriveImageUrl } from '../utils/helpers'
import './CourseDetail.css'

function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourse()
  }, [id])

  const loadCourse = async () => {
    try {
      const courses = await getCourses()
      const foundCourse = courses.find(c => c.id === parseInt(id))
      setCourse(foundCourse)
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading course...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="empty-state card">
            <h3>Course not found</h3>
            <button onClick={() => navigate('/courses')}>Back to Courses</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="course-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/courses')}>
          ← Back to Courses
        </button>
        
        <article className="course-detail card">
          {course.thumbnail && (
            <div className="course-detail-thumbnail">
              <img src={getGoogleDriveImageUrl(course.thumbnail)} alt={course.title} />
            </div>
          )}
          
          <div className="course-detail-header">
            <h1>{course.title}</h1>
            {course.duration && (
              <div className="course-meta">
                <span>⏱️ {course.duration}</span>
              </div>
            )}
          </div>

          <div className="course-description">
            <p>{course.description}</p>
          </div>

          {course.videos && course.videos.length > 0 && (
            <div className="course-lessons">
              <h2>Course Lessons ({course.videos.length})</h2>
              <div className="lessons-list">
                {course.videos.map((video, i) => (
                  <div key={i} className="lesson-item">
                    <div className="lesson-header">
                      <h3>Lesson {i + 1}: {video.title || `Video ${i + 1}`}</h3>
                    </div>
                    <VideoPlayer url={video.url} title={video.title} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export default CourseDetail
