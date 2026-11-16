import { Html } from '@react-three/drei'

interface ViewToggleButtonProps {
  viewMode: 'frames' | 'bookshelf'
  onToggle: () => void
  disabled: boolean
}

function ViewToggleButton({ viewMode }: ViewToggleButtonProps) {
  return (
    <Html
      fullscreen
      style={{
        pointerEvents: 'none'
      }}
    >
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        pointerEvents: 'none',
        zIndex: 1000
      }}>
        {/* Instructions */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.85)',
          color: '#f5f1e8',
          padding: '15px 20px',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '280px',
          lineHeight: '1.6',
          border: '2px solid rgba(212, 175, 55, 0.5)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold', color: '#FFD700' }}>
            {viewMode === 'frames' ? '🖼️ Gallery View' : '📚 Bookshelf View'}
          </div>
          {viewMode === 'frames' ? (
            <>
              <strong>Controls:</strong><br />
              • Arrow keys ←→ or swipe to navigate frames<br />
              • Press <kbd style={{ 
                background: '#D4AF37', 
                padding: '2px 6px', 
                borderRadius: '4px',
                fontWeight: 'bold',
                color: '#000'
              }}>Q</kbd> to view bookshelf
            </>
          ) : (
            <>
              <strong>Controls:</strong><br />
              • Drag or swipe to explore<br />
              • Click glowing books to read<br />
              • Press <kbd style={{ 
                background: '#D4AF37', 
                padding: '2px 6px', 
                borderRadius: '4px',
                fontWeight: 'bold',
                color: '#000'
              }}>Q</kbd> to view gallery
            </>
          )}
        </div>
      </div>
    </Html>
  )
}

export default ViewToggleButton
