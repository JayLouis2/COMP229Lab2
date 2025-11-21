// Use environment variable for API URL in production, fallback to /api for local development
const baseUrl = import.meta.env.VITE_API_URL || '/api'

async function request(url, options = {}){
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options })
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
