const API_KEY = 'AIzaSyA2eEhMrItpWYVgmDjMLxZJEV7paDjL1HA';
let myList = JSON.parse(localStorage.getItem('myList')) || [];
let myFavList = JSON.parse(localStorage.getItem('myFavList')) || [];
let myReadings = JSON.parse(localStorage.getItem('myReadings')) || [];


const currentURL = window.location.href;

document.addEventListener('DOMContentLoaded', () => {
    const savedList = JSON.parse(localStorage.getItem('myList')) || [];
    const savedFavList = JSON.parse(localStorage.getItem('myFavList')) || [];
    const savedMyReadings = JSON.parse(localStorage.getItem('myReadings')) || [];

    if (currentURL.includes('to-read.html')) {
        showBooks(savedList);
    } else if (currentURL.includes('favs.html')) {
        showBooks(savedFavList);
    } 
    else if(currentURL.includes('read.html')) {
        showBooks(savedMyReadings);
    }
   
});

function fetchBooks(searchTerm) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Erro: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.items) {
                showBooks(data.items);
            } else {
                console.log('Nenhum livro encontrado.');
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchQuery = document.querySelector('input[name="search"]').value;
    if (searchQuery) {
        fetchBooks(searchQuery);
    } else {
        alert('Por favor, insira um termo de pesquisa.');
    }
});

function showBooks(books) {
    const containerResults = document.getElementById('results');
    containerResults.innerHTML = '';

    books.forEach(book => {
        const volumeInfo = book.volumeInfo || book;
        const { title, authors, imageLinks } = volumeInfo;

        const bookCard = document.createElement('div');
        bookCard.classList.add('nome-img');

        const bookImage = document.createElement('img');
        bookImage.classList.add('img-book');
        bookImage.src = imageLinks ? imageLinks.thumbnail : '../assets/imgs/erro-img.png';
        bookImage.alt = `Capa do book ${title || 'Desconhecido'}`;
        bookCard.appendChild(bookImage);

        const bttnAdd = document.createElement('button');
        bttnAdd.classList.add('add-button');
        bttnAdd.textContent = '+';
        bookCard.appendChild(bttnAdd);

        const bttnFavorite = document.createElement('button');
        bttnFavorite.classList.add('favorite-button');
        bttnFavorite.innerHTML = '<img src="../assets/imgs/favoritar.png" alt="Favoritar" />';
        bookCard.appendChild(bttnFavorite);

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('nome-book');
        bookTitle.textContent = title || 'Título não disponível';
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('nome-autor');
        bookAuthor.textContent = `Autor(es): ${authors ? authors.join(', ') : 'Desconhecido'}`;
        bookCard.appendChild(bookAuthor);


        containerResults.appendChild(bookCard);


        bttnAdd.addEventListener('click', function() {
            const bookExist = myList.some(item => item.title === title);
            
            if (bookExist) {
                alert('Este livro já está na lista.');
            } else {
                myList.push({ title, authors, imageLinks });
                localStorage.setItem('myList', JSON.stringify(myList));
            }
        });

        bttnFavorite.addEventListener('click', function() {
            const bookFavorite = myFavList.some(item => item.title === title);
            
            if (bookFavorite) {
                alert('Este livro já está na lista de favoritos.');
            } else {
                myFavList.push({ title, authors, imageLinks });
                localStorage.setItem('myFavList', JSON.stringify(myFavList));
                bttnFavorite.innerHTML = '<img src="../assets/imgs/favoritado.png" alt="Favoritado" />';
            }
        });

        if(currentURL.includes('to-read.html')) {
            const bttnMarkAsRead = document.createElement('button');
            bttnMarkAsRead.classList.add('mark-as-read-button');
            bttnMarkAsRead.textContent = 'Marcar como lido';
            bookCard.appendChild(bttnMarkAsRead);

            bttnMarkAsRead.addEventListener('click', function() {
                myList = myList.filter(item => item.title !== title);
                localStorage.setItem('myList', JSON.stringify(myList));
                containerResults.removeChild(bookCard);
               
                myReadings.push({ title, authors, imageLinks });
                localStorage.setItem('myReadings', JSON.stringify(myReadings));
               
            });
        }

        if (currentURL.includes('favs.html')){
            bttnFavorite.innerHTML = '<img src="../assets/imgs/favoritado.png" alt="Favoritado" />';
        }

        if (currentURL.includes('to-read.html') || currentURL.includes('favs.html') || currentURL.includes('read.html')) { // página de lidos
            const bttnDelete = document.createElement('button');
            bttnDelete.classList.add('delete-button');
            bttnDelete.textContent = 'Remover';
            bookCard.appendChild(bttnDelete);

            bttnDelete.addEventListener('click', function() {
                if (currentURL.includes('to-read.html')) {
                    myList = myList.filter(item => item.title !== title);
                    localStorage.setItem('myList', JSON.stringify(myList));
                } else if (currentURL.includes('favs.html')) {
                    myFavList = myFavList.filter(item => item.title !== title);
                    localStorage.setItem('myFavList', JSON.stringify(myFavList));
                } // tirar do cache de lidos
                else if(currentURL.includes('read.html')){
                    myReadings = myReadings.filter(item => item.title !== title);
                    localStorage.setItem('myFavList', JSON.stringify(myReadings));
                }
                containerResults.removeChild(bookCard);
            });
        }
    });
}

function fetchRecommendations() {
    const recommendedTopics = ['romance', 'fantasia', 'humor', 'história'];
    const promises = recommendedTopics.map(topic => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${topic}&key=${API_KEY}`;
        return fetch(url).then(response => response.json());
    });

    Promise.all(promises)
        .then(results => {
            const allBooks = [];
            results.forEach(data => {
                if (data.items) {
                    allBooks.push(...data.items);
                }
            });
            showBooks(allBooks);
        })
        .catch(error => console.error('Erro ao buscar recomendações:', error));
}

document.getElementById('recomendations').addEventListener('click', function() {
    fetchRecommendations();
});
