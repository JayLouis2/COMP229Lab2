// Use environment variable for API URL in production, fallback to /api for local development
const baseUrl = import.meta.env.VITE_API_URL || '/api'

// Token storage
const TOKEN_KEY = 'auth_token'

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const isAuthenticated = () => !!getToken()

export const signOut = () => {
  setToken(null)
}

async function request(url, options = {}){
  const headers = { 'Content-Type': 'application/json' }
  
  // Add authorization header if token exists
  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const res = await fetch(url, { headers, ...options })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.status !== 204 ? res.json() : null
}

export const list = (resource) => request(`${baseUrl}/${resource}`)
export const getById = (resource, id) => request(`${baseUrl}/${resource}/${id}`)
export const create = (resource, data) => request(`${baseUrl}/${resource}`, { method: 'POST', body: JSON.stringify(data) })
export const update = (resource, id, data) => request(`${baseUrl}/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const remove = (resource, id) => request(`${baseUrl}/${resource}/${id}`, { method: 'DELETE' })
export const removeAll = (resource) => request(`${baseUrl}/${resource}`, { method: 'DELETE' })

// Authentication endpoints
export const signIn = async (email, password) => {
  const response = await request(`${baseUrl}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  if (response.token) {
    setToken(response.token)
  }
  return response
}

export const signUp = (data) => create('users', data)
