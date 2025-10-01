const API_BASE_URL = 'https://www.cheapshark.com/api/1.0';

//Test cases
console.log('Script loaded successfully');

// Add this to the top to test
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, script is working');
});


const USE_LOCAL_DATA = false; // Set to false to use live API
async function searchGames(query) {
    try {
        if (USE_LOCAL_DATA) {
            // Use local sample data for testing
                const response = await fetch('data.json');
                const allGames = await response.json();

            // Further filter results to ensure relevance
            const filteredGames = allGames.filter(game => 
            game.external.toLowerCase().includes(query.toLowerCase())
            );
            
            displayGames(filteredGames);

        } else {
        const response = await fetch(`${API_BASE_URL}/games?title=${encodeURIComponent(query)}&limit=3`);
        const games = await response.json();
        displayGames(games);
        }

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, script is working');
    
    // Initialize Vanta background
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg", // or just "body"
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            points: 12.00,
            maxDistance: 21.00,
            showDots: false,
            color: 0x3f7cac, // Optional: blue color
            backgroundColor: 0x23153c // Optional: dark background
        });
        console.log('Vanta.js background initialized');
    } else {
        console.error('Vanta.js not loaded');
    }

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Neo,',
  'the cheapest games',
  'you\'re going to realize',
  'they are all here',
  'that there\'s a difference',
  'between knowing the lowest prices',
  'and the best deals'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()


});