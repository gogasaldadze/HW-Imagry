function SearchBar({ search, onSearchChange, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          flex: 1,
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '8px'
        }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar

