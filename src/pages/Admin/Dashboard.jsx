import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPosts, getCourses } from '../../utils/api'
import './Admin.css'

function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, courses: 0 })
  const [posts, setPosts] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const postsData = await getPosts()
      const coursesData = await getCourses()
      setPosts(postsData)
      setCourses(coursesData)
      setStats({ posts: postsData.length, courses: coursesData.length })
    } catch (error) {
      console.error('Error loading data:', error)
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

        {posts.length > 0 && (
          <div className="content-list">
            <h2>Recent Posts</h2>
            <div className="list-grid">
              {posts.slice(0, 6).map(post => (
                <div key={post.id} className="list-item card">
                  <h4>{post.title}</h4>
                  <div className="item-actions">
                    <Link to={`/portfolio/${post.id}`}>
                      <button className="btn-view">View</button>
                    </Link>
                    <Link to={`/admin/edit-post/${post.id}`}>
                      <button className="btn-edit">Edit</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div className="content-list">
            <h2>Recent Courses</h2>
            <div className="list-grid">
              {courses.slice(0, 6).map(course => (
                <div key={course.id} className="list-item card">
                  <h4>{course.title}</h4>
                  <div className="item-actions">
                    <Link to={`/courses/${course.id}`}>
                      <button className="btn-view">View</button>
                    </Link>
                    <Link to={`/admin/edit-course/${course.id}`}>
                      <button className="btn-edit">Edit</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
