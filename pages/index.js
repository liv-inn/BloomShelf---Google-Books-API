const API_KEY = 'AIzaSyA2eEhMrItpWYVgmDjMLxZJEV7paDjL1HA';
let myList = JSON.parse(localStorage.getItem('myList')) || [];
let myFavList = JSON.parse(localStorage.getItem('myFavList')) || [];
const currentURL = window.location.href;

document.addEventListener('DOMContentLoaded', () => {
    const savedList = JSON.parse(localStorage.getItem('myList')) || [];
    const savedFavList = JSON.parse(localStorage.getItem('myFavList')) || [];

    console.log('Lista recuperada do localStorage:', savedList);
    console.log('Lista de favoritos recuperada do localStorage:', savedFavList);

    if (currentURL.includes('toRead.html')) {
        mostrarLivros(savedList);
    } else if (currentURL.includes('favs.html')) {
        mostrarLivros(savedFavList);
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
                mostrarLivros(data.items);
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

function mostrarLivros(livros) {
    const resultadoContainer = document.getElementById('results');
    resultadoContainer.innerHTML = '';

    livros.forEach(livro => {
        const volumeInfo = livro.volumeInfo || livro;
        const { title, authors, imageLinks } = volumeInfo;

        const livroCard = document.createElement('div');
        livroCard.classList.add('nome-img');

        const livroImagem = document.createElement('img');
        livroImagem.classList.add('img-livro');
        livroImagem.src = imageLinks ? imageLinks.thumbnail : '../assets/imgs/erro-img.png';
        livroImagem.alt = `Capa do livro ${title || 'Desconhecido'}`;
        livroCard.appendChild(livroImagem);

        const bttnAdd = document.createElement('button');
        bttnAdd.classList.add('add-button');
        bttnAdd.textContent = '+';
        livroCard.appendChild(bttnAdd);

        const bttnFavorite = document.createElement('button');
        bttnFavorite.classList.add('favorite-button');
        bttnFavorite.innerHTML = '<img src="../assets/imgs/favoritar.png" alt="Favoritar" />';
        livroCard.appendChild(bttnFavorite);

        const livroTitulo = document.createElement('p');
        livroTitulo.classList.add('nome-livro');
        livroTitulo.textContent = title || 'Título não disponível';
        livroCard.appendChild(livroTitulo);

        const livroAutor = document.createElement('p');
        livroAutor.classList.add('nome-autor');
        livroAutor.textContent = `Autor(es): ${authors ? authors.join(', ') : 'Desconhecido'}`;
        livroCard.appendChild(livroAutor);

        const bttnDelete = document.createElement('button');
        bttnDelete.classList.add('delete-button');
        bttnDelete.textContent = 'Remover';
        livroCard.appendChild(bttnDelete);

        resultadoContainer.appendChild(livroCard);

        bttnAdd.addEventListener('click', function() {
            const livroExiste = myList.some(item => item.title === title);

            if (livroExiste) {
                alert('Este livro já está na lista.');
            } else {
                myList.push({ title, authors, imageLinks });
                localStorage.setItem('myList', JSON.stringify(myList));
                console.log('myList salva no localStorage:', JSON.parse(localStorage.getItem('myList')));
            }
        });

        bttnFavorite.addEventListener('click', function() {
            const livroFavorito = myFavList.some(item => item.title === title);
            
            if (livroFavorito) {
                alert('Este livro já está na lista de favoritos.');
            } else {
                myFavList.push({ title, authors, imageLinks });
                localStorage.setItem('myFavList', JSON.stringify(myFavList));
                console.log('myFavList salva no localStorage:', JSON.parse(localStorage.getItem('myFavList')));
                bttnFavorite.innerHTML = '<img src="../assets/imgs/favoritado.png" alt="Favoritado" />';

            }
        });

        if(currentURL.includes('toRead.html')) {
            const bttnMarkAsRead = document.createElement('button');
            bttnMarkAsRead.classList.add('mark-as-read-button');
            bttnMarkAsRead.textContent = 'Marcar como lido';
            livroCard.appendChild(bttnMarkAsRead);

            bttnMarkAsRead.addEventListener('click', function() {
                myList = myList.filter(item => item.title !== title);
                localStorage.setItem('myList', JSON.stringify(myList));
                resultadoContainer.removeChild(livroCard);
                console.log('Livro marcado como lido:', title);
            });
        }

        bttnDelete.addEventListener('click', function() {
            myList = myList.filter(item => item.title !== title);
            localStorage.setItem('myList', JSON.stringify(myList));
            resultadoContainer.removeChild(livroCard);
            console.log('Livro removido da lista:', title);
        });
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
            mostrarLivros(allBooks);
        })
        .catch(error => console.error('Erro ao buscar recomendações:', error));
}

document.getElementById('recomendations').addEventListener('click', function() {
    fetchRecommendations();
});
