const API_BASE_URL = 'https://www.cheapshark.com/api/1.0';

async function searchGames(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/games?title=${encodeURIComponent(query)}&limit=10`);
        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        displayError('Failed to fetch games. Please try again.');
    }
}

function displayGames(games) {
    const resultsContainer = document.getElementById('results');
    console.log('Number of games found:', games.length);
    console.log('Full games array:', games);
    
    if (games.length === 0) {
        resultsContainer.innerHTML = '<p>No games found.</p>';
        return;
    }
    
        const gamesList = games.map(game => `
            <div class="game-item">
                <img src="${game.thumb}" alt="${game.external}" class="game-thumbnail">
                <div class="game-info">
                    <h3>${game.external}</h3>
                    <p>Cheapest Price: $${game.cheapest}</p>
                </div>
            </div>
        `).join('');
        resultsContainer.innerHTML = gamesList;
}

//Buttons
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-container form');
    const searchButton = document.querySelector('.search-container button');
    const searchInput = document.querySelector('.search-container input[type="text"]');
    
    // Prevent form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });

    // Both button click and Enter key call the same function
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

function performSearch() {
    const searchInput = document.querySelector('.search-container input[type="text"]');
    const query = searchInput.value.trim();
    if (query) {
        searchGames(query);
    }
}

function displayError(message) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}
