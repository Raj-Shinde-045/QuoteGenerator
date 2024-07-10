const quotes = [
    { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
    { text: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", author: "Robert Frost" }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentQuote = null;

function generateQuote() {
    document.querySelector('.loader').style.display = 'block';
    document.getElementById('quote').style.opacity = '0';
    document.getElementById('author').style.opacity = '0';

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex];
        document.getElementById('quote').textContent = `"${currentQuote.text}"`;
        document.getElementById('author').textContent = `- ${currentQuote.author}`;

        document.querySelector('.loader').style.display = 'none';
        document.getElementById('quote').style.opacity = '1';
        document.getElementById('author').style.opacity = '1';

        updateFavoriteButton();
    }, 500);
}

function addToFavorites() {
    if (currentQuote && currentQuote.text && currentQuote.author) {
        if (!favorites.some(fav => fav.text === currentQuote.text)) {
            favorites.push(currentQuote);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesList();
            updateFavoriteButton();
        } else {
            alert('This quote is already in your favorites!');
        }
    } else {
        alert('Sorry, there was an error adding this quote to favorites.');
    }
}

function updateFavoriteButton() {
    const favoriteButton = document.querySelector('.favorite-button');
    if (currentQuote && favorites.some(fav => fav.text === currentQuote.text)) {
        favoriteButton.textContent = '❤️';
        favoriteButton.classList.add('favorited');
    } else {
        favoriteButton.textContent = '🤍';
        favoriteButton.classList.remove('favorited');
    }
}

function updateFavoritesList() {
    const list = document.getElementById('favorites-list');
    list.innerHTML = '';
    if (favorites.length === 0) {
        list.innerHTML = '<li>No favorites yet. Add some quotes!</li>';
    } else {
        favorites.forEach((fav, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>"${fav.text}" - ${fav.author}</span>`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.className = 'remove-favorite';
            removeButton.onclick = () => removeFavorite(index);
            li.appendChild(removeButton);
            list.appendChild(li);
        });
    }
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
    updateFavoriteButton();
}

function copyToClipboard() {
    const quote = document.getElementById('quote').textContent;
    const author = document.getElementById('author').textContent;
    navigator.clipboard.writeText(`${quote} ${author}`).then(() => {
        alert('Quote copied to clipboard!');
    });
}

function share(platform) {
    const quote = document.getElementById('quote').textContent;
    const author = document.getElementById('author').textContent;
    const text = `${quote} ${author}`;
    let url;

    if (platform === 'twitter') {
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    } else if (platform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    }

    window.open(url, '_blank');
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Theme initialization
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

// Initial calls
generateQuote();
updateFavoritesList();
updateFavoriteButton();