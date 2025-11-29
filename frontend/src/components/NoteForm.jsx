function NoteForm({ title, text, editing, onTitleChange, onTextChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>{editing ? 'Edit Note' : 'Create Note'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '4px'
        }}
      />
      <textarea
        placeholder="Text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '4px',
          minHeight: '100px',
          resize: 'vertical'
        }}
      />
      <div>
        <button type="submit" style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        }}>
          {editing ? 'Update' : 'Create'}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default NoteForm

