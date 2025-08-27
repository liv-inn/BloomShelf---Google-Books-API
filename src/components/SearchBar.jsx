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
    <div className="w-100 max-w-2xl mx-auto flex justify-center">
      <div className="relative w-80">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books..."
          className="w-full border h-12 border-gray-300 p-3 pr-10 rounded-full focus:outline-none placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-pink-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-700 hover:bg-pink-800 disabled:bg-pink-400 text-white p-2 rounded-full transition-colors"
        >
          <FaSearch size={16} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
