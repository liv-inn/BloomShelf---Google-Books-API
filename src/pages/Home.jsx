import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import CardBook from "../components/CardBook";
import { useEffect, useState } from "react";
import { getBooks, getRecommendations } from "../API.js";
import ListButtons from "../components/ListButtons.jsx";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    try {
      const results = await getBooks(searchTerm);
      const uniqueResults = results.filter((book, index, self) =>
        index === self.findIndex(b => b.id === book.id)
      );
      
      if (uniqueResults.length === 0) {
        alert("No books found. Please try a different search term.");
        setBooks([]);
      } else {
        setBooks(uniqueResults);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching for books. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommendations = async () => {
    setIsLoading(true);
    try {
      const results = await getRecommendations();
      const uniqueResults = results.filter((book, index, self) =>
        index === self.findIndex(b => b.id === book.id)
      );
      setBooks(uniqueResults);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Error loading recommendations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "recommendations") {
      handleRecommendations();
    } else if (activeTab === "search") {
      setBooks([]); 
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col justify-center mt-2 p-4 gap-6  px-2 text-center">
      <Logo />
     <span className="text-2xl font-semibold text-[#353535]">
      Hello, {name}
     </span>

      <span className="text-sm text-[#353535]">
        <strong>Let's find your next favorite book.</strong>
        <br />
        Which story will bloom for you today?
      </span>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <div>
        <ListButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "to-read" && <div>📚 </div>}
        {activeTab === "recommendations" && <div></div>}
        {activeTab === "favs" && <div></div>}
        {activeTab === "finished" && <div></div>}
      </div>

      <div className="mt-4">
        {(activeTab === "search" || activeTab === "recommendations") && books.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
            {books.map((book) => (
              <CardBook key={book.id} book={book} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;