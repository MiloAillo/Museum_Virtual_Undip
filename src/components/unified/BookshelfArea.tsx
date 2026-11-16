import Bookshelf from '../bookshelf/Bookshelf'
import BookReader from '../bookshelf/BookReader'
import type { BookData } from '../bookshelf/BookshelfScene'

interface BookshelfAreaProps {
  books: BookData[]
  onBookClick: (book: BookData) => void
  selectedBook: BookData | null
  onCloseBook: () => void
}

function BookshelfArea({ books, onBookClick, selectedBook, onCloseBook }: BookshelfAreaProps) {
  return (
    <group position={[0, 0, 3]}>
      <Bookshelf books={books} onBookClick={onBookClick} />
      
      {selectedBook && (
        <BookReader book={selectedBook} onClose={onCloseBook} />
      )}
    </group>
  )
}

export default BookshelfArea
