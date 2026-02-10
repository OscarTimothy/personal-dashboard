// API Configuration Template
// Copy this file to 'api-config.js' and add your API keys

const API_CONFIG = {
    // OpenWeatherMap API
    // Sign up: https://openweathermap.org/api
    // Free tier: 1000 calls/day
    openWeather: {
        apiKey: 'YOUR_OPENWEATHER_API_KEY',
        enabled: false
    },

    // API-Football (Soccer)
    // Sign up: https://www.api-football.com/
    // Free tier: 100 calls/day
    football: {
        apiKey: 'YOUR_API_FOOTBALL_KEY',
        enabled: false,
        teams: {
            manUnited: 33,   // Manchester United team ID
            realMadrid: 541  // Real Madrid team ID
        }
    },

    // API-Sports (Basketball)
    // Sign up: https://api-sports.io/
    // Free tier: 100 calls/day
    // Note: Can use same key as football API
    basketball: {
        apiKey: 'YOUR_API_SPORTS_KEY',
        enabled: false
    },

    // NewsAPI
    // Sign up: https://newsapi.org/
    // Free tier: 100 requests/day
    news: {
        apiKey: 'YOUR_NEWSAPI_KEY',
        enabled: false
    },

    // CoinGecko (Cryptocurrency)
    // No API key needed for basic usage!
    // Free tier: 50 calls/minute
    crypto: {
        enabled: true, // Already working, no key needed
        coins: ['bitcoin', 'stellar', 'ripple'] // Default coins
    },

    // Real Estate APIs (Optional)
    // Consider using RapidAPI services
    realEstate: {
        apiKey: 'YOUR_REALESTATE_API_KEY',
        enabled: false,
        location: 'Cleveland, OH'
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
