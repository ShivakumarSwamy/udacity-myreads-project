import {useEffect, useState} from "react";
import Book from "./Book";
import {search, update} from "../BooksAPI";
import {Link} from "react-router-dom";

const SearchBooks = ({books, updateBooks}) => {
    const [query, setQuery] = useState("");
    const [showSearchBooks, setShowSearchBooks] = useState([]);

    const updateQuery = (query) => {
        setQuery(query);
    }

    useEffect(
        () => {
            let isMounted = true;

            if (query !== "" || query.trim()) {
                search(query, 10).then(searchResults => {

                    if (isMounted) {
                        if (searchResults.error) {
                            setShowSearchBooks([]);
                        } else {
                            // check if book is already in shelf, else add none to shelf
                            searchResults.forEach(searchBook => {
                                const book = books.find(book => book.id === searchBook.id);
                                searchBook.shelf = book ? book.shelf : "none";
                            });
                            setShowSearchBooks(searchResults);
                        }
                    }
                }).catch(error => console.error("Error searching books: ", error));
            } else {
                setShowSearchBooks([]);
            }

            return () => {
                // explicitly set isMounted to false when component is unmounted
                // as noticed, sometimes when query is empty, results are still populated of previous search
                isMounted = false
            };
        }, [query, books]
    )

    const postUpdate = (selectedBook, selectedShelf, response) => {
        // check response for each shelf, and override its shelf value
        // drop book which has shelf not part of response
        // initialize the initial array with selectedBook and selectedShelf if not found in books
        updateBooks(
            Object.keys(response).reduce((accumulator, key) =>
                    accumulator.concat(
                        books.filter(book => response[key].includes(book.id))
                            .map(book => ({...book, shelf: key}))
                    )
                , []
            ).concat(
                books.find(book => book.id === selectedBook.id) ? [] : [{...selectedBook, shelf: selectedShelf}]
            )
        );
    }

    const moveToShelf = (selectedBook, selectedShelf) => {
        update(selectedBook, selectedShelf)
            .then(response => postUpdate(selectedBook, selectedShelf, response))
            .catch(error => console.error("Error moving book to shelf: ", error));
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={event => updateQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        showSearchBooks.map(book => <Book key={book.id} book={book} moveToShelf={moveToShelf}/>)
                    }
                </ol>
            </div>
        </div>
    )
}

export default SearchBooks