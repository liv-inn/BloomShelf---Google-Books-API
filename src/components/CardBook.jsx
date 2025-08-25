import { FaStar } from "react-icons/fa";

function CardBook({ book, onAddToFavorites }) {
  return (
    <div className="bg-white  rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-56 h-[380px] flex flex-col">
      {book.thumbnail && (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="flex flex-col flex-1 p-3">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-1">
          by {book.authors.join(", ")}
        </p>

        <p className="text-gray-700 text-xs flex-1 line-clamp-3 ">
          {book.description.length > 120
            ? book.description.substring(0, 120) + "..."
            : book.description}
        </p>

        <button
          onClick={() => onAddToFavorites(book)}
          className="self-end bg-pink-700 hover:bg-pink-400 text-white px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1"
        >
          <FaStar className="text-sm" /> Fav
        </button>
      </div>
    </div>
  );
}

export default CardBook;
