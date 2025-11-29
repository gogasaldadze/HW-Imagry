const API_BASE = 'http://127.0.0.1:8000/api/v1'

export const notesAPI = {
  getAll: async (searchTerm = '', page = 1) => {
    const params = new URLSearchParams()
    if (searchTerm) {
      params.append('search', searchTerm)
    }
    params.append('page', page)
    
    const url = `${API_BASE}/notes/?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch notes')
    return res.json()
  },

  create: async (title, text) => {
    const res = await fetch(`${API_BASE}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text })
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.message || `Failed to create note: ${res.status} ${res.statusText}`)
    }
    return res.json()
  },

  update: async (uuid, title, text) => {
    const res = await fetch(`${API_BASE}/notes/${uuid}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text })
    })
    if (!res.ok) throw new Error('Failed to update note')
    return res.json()
  },

  delete: async (uuid) => {
    const res = await fetch(`${API_BASE}/notes/${uuid}/`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete note')
  }
}

