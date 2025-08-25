const API_KEY = import.meta.env.VITE_API_KEY;;

let myFavList = [];

function fetchBooks(searchTerm) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchTerm
  )}&key=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      if (data.items) {
        return data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown Author"],
          description:
            item.volumeInfo.description || "No description available",
          thumbnail: item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : "",
        }));
      } else {
        return [];
      }
    });
}

function handleFavClick(book) {
  const bookFav = myFavList.some((item) => item.id === book.id);
  if (bookFav) {
    alert("This book is already in your favorites!");
    return;
  }
  myFavList.push(book);

}

function getFavorites() {
  return myFavList;
}

function removeFavorite(bookId) {
  myFavList = myFavList.filter((book) => book.id !== bookId);
}

export { fetchBooks, handleFavClick, getFavorites, removeFavorite };