import { useState, useEffect } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { getCourses } from '../utils/api'
import './Courses.css'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Courses</h1>
        <p>Learn robotics, AI, and cutting-edge technologies</p>
      </div>
      <div className="container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading courses...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card card">
                {course.thumbnail && (
                  <div className="course-thumbnail">
                    <img src={course.thumbnail} alt={course.title} />
                  </div>
                )}
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  {course.videos && course.videos.length > 0 && (
                    <div className="course-videos">
                      <h4>Course Videos ({course.videos.length})</h4>
                      {course.videos.map((video, i) => (
                        <VideoPlayer 
                          key={i} 
                          url={video.url} 
                          title={video.title || `Lesson ${i + 1}`} 
                        />
                      ))}
                    </div>
                  )}
                  {course.duration && (
                    <div className="course-meta">
                      <span>⏱️ {course.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <h3>No courses yet</h3>
            <p>Check back soon for new courses!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
