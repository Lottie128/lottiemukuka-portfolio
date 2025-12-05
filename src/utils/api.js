import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Posts
export const getPosts = async () => {
  try {
    const response = await api.get('/posts.php')
    return response.data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const createPost = async (postData) => {
  const response = await api.post('/posts.php', postData)
  return response.data
}

// Courses
export const getCourses = async () => {
  try {
    const response = await api.get('/courses.php')
    return response.data || []
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export const createCourse = async (courseData) => {
  const response = await api.post('/courses.php', courseData)
  return response.data
}

// Auth
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth.php', { username, password })
    if (response.data.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token)
      return true
    }
    return false
  } catch (error) {
    console.error('Login error:', error)
    return false
  }
}

export const logout = () => {
  localStorage.removeItem('auth_token')
}

export default api
