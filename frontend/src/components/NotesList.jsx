function NotesList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#999' }}>No notes found</p>
    )
  }

  return (
    <div>
      {notes.map(note => (
        <div key={note.uuid} style={{
          background: 'white',
          padding: '20px',
          marginBottom: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '10px' }}>{note.title}</h3>
          <p style={{ color: '#666', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
            {note.text}
          </p>
          <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '10px' }}>
            {new Date(note.created_at).toLocaleString()}
          </div>
          <div>
            <button onClick={() => onEdit(note)} style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Edit
            </button>
            <button onClick={() => onDelete(note.uuid)} style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotesList

