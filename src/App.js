import "./App.css";
import {useEffect, useState} from "react";
import SearchBooks from "./components/SearchBooks";
import {getAll} from "./BooksAPI";
import {Route, Routes} from "react-router-dom";
import ListBooks from "./components/ListBooks";

function App() {
    const [books, setBooks] = useState([]);

    const updateBooks = (allBooks) => {
        setBooks(allBooks)
    }

    useEffect(() => {
        getAll()
            .then(books => setBooks(books))
            .catch(error => console.error("Error fetching books: ", error))
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route exact
                       path="/"
                       element={<ListBooks books={books} updateBooks={updateBooks}/>}
                />
                <Route exact
                       path="/search"
                       element={<SearchBooks books={books} updateBooks={updateBooks}/>}
                />
            </Routes>
        </div>
    );
}

export default App;