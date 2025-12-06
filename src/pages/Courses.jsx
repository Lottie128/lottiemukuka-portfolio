import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourses } from '../utils/api'
import { getGoogleDriveImageUrl } from '../utils/helpers'
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
              <Link key={course.id} to={`/courses/${course.id}`} className="course-link">
                <div className="course-card card">
                  {course.thumbnail && (
                    <div className="course-thumbnail">
                      <img src={getGoogleDriveImageUrl(course.thumbnail)} alt={course.title} />
                    </div>
                  )}
                  <div className="course-content">
                    <h3>{course.title}</h3>
                    <p>{course.description.substring(0, 120)}...</p>
                    <div className="course-meta">
                      {course.duration && <span>⏱️ {course.duration}</span>}
                      {course.videos && <span>📹 {course.videos.length} lessons</span>}
                    </div>
                    <span className="view-course">View Course →</span>
                  </div>
                </div>
              </Link>
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
