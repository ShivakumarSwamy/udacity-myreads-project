import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";

const ListBooks = ({books, updateBooks}) => {
    const bookShelf = [
        {
            title: "Currently Reading",
            shelf: "currentlyReading"
        },
        {
            title: "Want to Read",
            shelf: "wantToRead"
        },
        {
            title: "Read",
            shelf: "read"
        }
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {
                    bookShelf.map(bookShelf =>
                        <BookShelf key={bookShelf.shelf}
                                   title={bookShelf.title}
                                   shelf={bookShelf.shelf}
                                   books={books}
                                   updateBooks={updateBooks}
                        />
                    )
                }
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default ListBooks;