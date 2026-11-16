import { Html } from '@react-three/drei'
import type { BookData } from './BookshelfScene'
import { useState } from 'react'

interface BookReaderProps {
  book: BookData
  onClose: () => void
}

function BookReader({ book, onClose }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  
  // Split content into pages (roughly 300 chars per page)
  const charsPerPage = 300
  const pages: string[] = []
  for (let i = 0; i < book.content.length; i += charsPerPage) {
    pages.push(book.content.slice(i, i + charsPerPage))
  }

  const totalPages = pages.length

  return (
    <Html
      center
      distanceFactor={10}
      style={{
        width: '80vw',
        maxWidth: '900px',
        height: '80vh',
        maxHeight: '700px',
        pointerEvents: 'auto'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #f9f6f0 0%, #f5f1e8 100%)',
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
          padding: '40px 50px',
          position: 'relative',
          fontFamily: 'Georgia, serif',
          color: '#2a1810',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          border: '2px solid #8B7355'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: '#8B4513',
            color: '#f5f1e8',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#A0522D'
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#8B4513'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          ×
        </button>

        {/* Book title and author */}
        <div style={{ marginBottom: '30px', borderBottom: '2px solid #8B7355', paddingBottom: '20px' }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#3d2817',
            textAlign: 'center'
          }}>
            {book.title}
          </h1>
          <p style={{
            margin: 0,
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#5a3f2a',
            textAlign: 'center'
          }}>
            by {book.author}
          </p>
        </div>

        {/* Book content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          fontSize: '18px',
          lineHeight: '1.8',
          textAlign: 'justify',
          paddingRight: '10px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: 0, textIndent: '30px' }}>
            {pages[currentPage]}
          </p>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #8B7355',
            paddingTop: '20px'
          }}>
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              style={{
                background: currentPage === 0 ? '#ccc' : '#8B4513',
                color: '#f5f1e8',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              ← Previous
            </button>

            <span style={{
              fontSize: '16px',
              color: '#5a3f2a',
              fontWeight: 'bold'
            }}>
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              style={{
                background: currentPage === totalPages - 1 ? '#ccc' : '#8B4513',
                color: '#f5f1e8',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Decorative corner ornaments */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '30px',
          height: '30px',
          borderTop: '3px solid #8B7355',
          borderLeft: '3px solid #8B7355'
        }} />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
          borderTop: '3px solid #8B7355',
          borderRight: '3px solid #8B7355'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          width: '30px',
          height: '30px',
          borderBottom: '3px solid #8B7355',
          borderLeft: '3px solid #8B7355'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
          borderBottom: '3px solid #8B7355',
          borderRight: '3px solid #8B7355'
        }} />
      </div>
    </Html>
  )
}

export default BookReader
