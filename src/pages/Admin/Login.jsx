import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../utils/api'
import './Admin.css'

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const success = await login(credentials.username, credentials.password)
      if (success) {
        navigate('/admin/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="login-card card">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
