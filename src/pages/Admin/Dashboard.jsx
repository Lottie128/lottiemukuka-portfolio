import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPosts, getCourses } from '../../utils/api'
import './Admin.css'

function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, courses: 0 })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const posts = await getPosts()
      const courses = await getCourses()
      setStats({ posts: posts.length, courses: courses.length })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your portfolio and courses</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{stats.posts}</h3>
              <p>Portfolio Posts</p>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <h3>{stats.courses}</h3>
              <p>Courses</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/admin/create-post">
            <div className="action-card card">
              <h3>Create Portfolio Post</h3>
              <p>Add a new project or achievement to your timeline</p>
              <button>Create Post</button>
            </div>
          </Link>
          <Link to="/admin/create-course">
            <div className="action-card card">
              <h3>Create Course</h3>
              <p>Add a new educational course with videos</p>
              <button>Create Course</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
