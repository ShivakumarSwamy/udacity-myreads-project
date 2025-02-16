const Book = ({book, moveToShelf}) => {

    const handleOnChangeShelf = (event) => {
        moveToShelf(book, event.target.value);
    }

    // example book object
    // {
    //     "title": "To Kill a Mockingbird",
    //     "authors": [
    //         "Harper Lee"
    //     ],
    //     "shelf": "currentlyReading",
    //     "imageLinks": {
    //         "thumbnail": "http://books.google.com/books/content?id=1yFbPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    //     }
    // }

    return (
        // check if
        // 1. book object is not empty
        // 2. book object has authors array and has minimum 1 author
        // 3. book object has imageLinks.thumbnail has value

        book && book.authors && book.authors.length > 0 && book.imageLinks?.thumbnail && (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 188,
                                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                            }}
                        ></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf === undefined ? "" : book.shelf} onChange={handleOnChangeShelf}>
                                <option value="" disabled>
                                    {book.shelf === undefined ? "Add to..." : "Move to..."}
                                </option>

                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                {
                                    book.shelf !== undefined && <option value="none">None</option>
                                }
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {
                        book.authors.map(author => <div className="book-authors" key={author}>{author}</div>)
                    }
                </div>
            </li>
        )
    )
}

export default Book;