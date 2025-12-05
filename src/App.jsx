import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Courses from './pages/Courses'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import CreatePost from './pages/Admin/CreatePost'
import CreateCourse from './pages/Admin/CreateCourse'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-post" element={<CreatePost />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
