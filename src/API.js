const API_KEY = import.meta.env.VITE_API_KEY;

export async function getBooks(searchTerm) {
  try {
    const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchTerm
    )}&key=${API_KEY}`;

    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export async function getRecommendations() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}
