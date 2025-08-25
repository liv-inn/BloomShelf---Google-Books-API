import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import ToRead from "./ToRead";
import Recommendations from "./Recommendations";
import Favs from "./Favs";
import Finished from "./Finished";
import CardBook from "../components/CardBook";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchBooks, handleFavClick } from "../API.js";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    try {
      const results = await fetchBooks(searchTerm);
      if (results.length === 0) {
        alert("No books found. Please try a different search term.");
        setBooks([]);
      } else {
        setBooks(results);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching for books. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = (book) => {
    handleFavClick(book);
  };

  const links = [
    { path: "/to-read", label: "To-read", element: <ToRead /> },
    {
      path: "/recommendations",
      label: "Recommendations",
      element: <Recommendations />,
    },
    { path: "/favs", label: "Favorites", element: <Favs /> },
    { path: "/finished", label: "Finished", element: <Finished /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Logo />
      <span className="text-white mb-4 bg-pink-700 p-4 text-center rounded-lg ">
        Trabalhando em um novo layout! Refazendo o projeto com React e TailwindCSS
        :P
      </span>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <section>
        <ul>
          {links.map((link) => (
            <li key={link.path} className="inline-flex ">
              <Link
                to={link.path}
                className="text-white bg-pink-600 rounded-xl m-2 p-2 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div>
        <Routes>
          {links.map((link) => (
            <Route key={link.path} path={link.path} element={link.element} />
          ))}
        </Routes>
      </div>
      <div className="flex gap-4 mt-2 w-full max-w-6xl px-4 justify-center">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <CardBook
              key={book.id}
              book={book}
              onAddToFavorites={handleAddToFavorites}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
