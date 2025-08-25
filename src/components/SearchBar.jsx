import { useState } from "react";
import { FaSearch } from "react-icons/fa"; 

function SearchBar({ onSearch, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term");
      return;
    }
    onSearch(searchTerm);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books..."
          className="flex-1 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-pink-700 hover:bg-pink-800 disabled:bg-pink-400 text-white p-3 rounded-full transition-colors"
        >
          <FaSearch size={20} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;