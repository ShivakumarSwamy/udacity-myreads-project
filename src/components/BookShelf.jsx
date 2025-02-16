import Book from "./Book";
import {update} from "../BooksAPI";

const BookShelf = ({title, shelf, books, updateBooks}) => {

    // example out response object
    // {
    //     "currentlyReading": [
    //         "sJf1vQAACAAJ",
    //     ],
    //     "wantToRead": [
    //         "pF2ka_E_R5YC",
    //     ],
    //     "read": [
    //         "jAUODAAAQBAJ",
    //     ]
    // }
    const postUpdate = (response) => {
        // check response for each shelf, and override its shelf value
        // drop book which has shelf not part of response
        updateBooks(
            Object.keys(response).reduce((accumulator, key) =>
                accumulator.concat(
                    books.filter(book => response[key].includes(book.id))
                        .map(book => ({...book, shelf: key}))
                )
                , []
            )
        );
    }

    const moveToShelf = (selectedBook, selectedShelf) => {
        update(selectedBook, selectedShelf)
            .then((response) => postUpdate(response))
            .catch(error => console.error("Error moving book to shelf: ", error));
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.filter(book => book.shelf === shelf)
                            .map(book => <Book key={book.id} book={book} moveToShelf={moveToShelf}/>)
                    }
                </ol>
            </div>
        </div>
    )
};

export default BookShelf;