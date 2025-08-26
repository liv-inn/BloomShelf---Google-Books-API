import { FaStar } from "react-icons/fa";

function CardBook({ book, onAddToFavorites }) {
  function truncateText(text, maxLength) {
    if (!text) return "Sem descrição";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  return (
    <li className="rounded-lg text-gray-700 text-sm bg-gray-100 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow h-60 overflow-hidden">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
          className="mb-2 w-full h-32 object-cover rounded-t-lg"
        />
      )}

      <h3 className="font-semibold text-center px-2">
        {truncateText(book.volumeInfo.title, 50)}
      </h3>

      <span className="text-center px-2 mb-2">
        {truncateText(
          book.volumeInfo.authors
            ? book.volumeInfo.authors.join(", ")
            : "Unknown Author",
          30
        )}
      </span>

      <button
        onClick={() => onAddToFavorites && onAddToFavorites(book)}
        className="text-yellow-500 hover:text-yellow-700 mt-auto mb-2"
      >
        <FaStar />
      </button>
    </li>
  );
}

export default CardBook;