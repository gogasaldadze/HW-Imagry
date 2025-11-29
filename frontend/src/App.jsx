import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import { notesAPI } from './api/notes'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null })

  useEffect(() => {
    loadNotes(search, currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const loadNotes = async (searchTerm = '', page = 1) => {
    try {
      const data = await notesAPI.getAll(searchTerm, page)
      setNotes(data.results || data)
      if (data.count !== undefined) {
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous
        })
      }
    } catch (error) {
      console.error('Error loading notes:', error)
      alert(`Error loading notes: ${error.message}. Make sure the backend is running on http://127.0.0.1:8000`)
    }
  }

  const handleSearchChange = (term) => {
    setSearch(term)
  }

  const handleSearch = () => {
    setCurrentPage(1)
    loadNotes(search, 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !text.trim()) return

    try {
      if (editing) {
        await notesAPI.update(editing.uuid, title, text)
        setEditing(null)
      } else {
        await notesAPI.create(title, text)
      }
      setTitle('')
      setText('')
      loadNotes(search, currentPage)
    } catch (error) {
      console.error('Error saving note:', error)
      alert(`Error: ${error.message}. Check console for details.`)
    }
  }

  const handleDelete = async (uuid) => {
    if (!confirm('Delete this note?')) return
    try {
      await notesAPI.delete(uuid)
      loadNotes(search, currentPage)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    loadNotes(search, page)
  }

  const handleEdit = (note) => {
    setEditing(note)
    setTitle(note.title)
    setText(note.text)
  }

  const handleCancel = () => {
    setEditing(null)
    setTitle('')
    setText('')
  }

  const totalPages = Math.ceil(pagination.count / 3)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>📝 Notes App</h1>
      
      <SearchBar 
        search={search} 
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      <NoteForm
        title={title}
        text={text}
        editing={editing}
        onTitleChange={setTitle}
        onTextChange={setText}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <NotesList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {pagination.count > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '10px',
          marginTop: '20px',
          padding: '20px'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.previous}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: pagination.previous ? '#4a90e2' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: pagination.previous ? 'pointer' : 'not-allowed'
            }}
          >
            Previous
          </button>
          
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Page {currentPage} of {totalPages} ({pagination.count} total notes)
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.next}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: pagination.next ? '#4a90e2' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: pagination.next ? 'pointer' : 'not-allowed'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default App
