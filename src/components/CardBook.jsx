import { FaStar } from "react-icons/fa";

function CardBook({ book, onAddToFavorites }) {
  function truncateText(text, maxLength) {
    if (!text) return "No title available";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const { title, authors, imageLinks } = book.volumeInfo;
  const authorText = authors ? authors.join(", ") : "Unknown author";

  return (
    <li className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 flex flex-col items-center w-full max-w-[220px] mx-auto">
      
     
      <div className="w-40 h-56 mb-4">
        <img
          src={imageLinks?.thumbnail || "https://via.placeholder.com/160x224"}
          alt={`Capa do livro ${title}`}
          className="w-full h-full object-cover rounded-md shadow-md"
        />
      </div>

      <div className="text-center flex-grow">
        <h3 className="text-base font-bold text-slate-800 leading-tight">
          {truncateText(title, 40)}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {truncateText(authorText, 30)}
        </p>
      </div>

      <button
        onClick={(e) => {
            e.stopPropagation(); 
            onAddToFavorites(book);
        }}
        className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 mt-3"
        aria-label="Add to favorites"
      >
        <FaStar size={24} />
      </button>

    </li>
  );
}

export default CardBook;