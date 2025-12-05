import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Lottie Mukuka</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}>
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}>
              Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
