# Personal Dashboard

A customizable personal dashboard that aggregates your interests in one place: Project Management, AI, Sports, Finance, and News.

## Features

✅ **Dark/Light Mode** - Toggle between themes with preference saved
✅ **Mobile Responsive** - Works seamlessly on all devices
✅ **Auto-Refresh** - Updates every 6 hours automatically
✅ **Manual Refresh** - Refresh button for instant updates
✅ **Customizable Widgets** - Show/hide widgets based on your interests
✅ **Settings Persistence** - All settings saved to localStorage

## Widgets Included

1. **Weather** - Current weather for your location
2. **Cryptocurrency** - Live prices for Bitcoin, XLM, XRP, and custom coins
3. **Soccer** - Scores for Manchester United & Real Madrid
4. **Basketball** - NBA scores and news
5. **AI & Technology** - Latest AI news and advancements
6. **Project Management** - Agile, Scrum, Lean Six Sigma updates
7. **Finance & Real Estate** - Cleveland real estate, finance tips
8. **Breaking News** - Latest news headlines

## Quick Start

1. **Open the dashboard**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

2. **Click Settings (⚙️)** to customize:
   - Your location for weather
   - Additional cryptocurrencies to track
   - Which widgets to display

3. **Save your settings** - They'll persist across sessions!

## Integrating Real APIs

The dashboard currently uses **mock data** for demonstration. To get live data, you'll need to integrate real APIs:

### 1. Weather API (OpenWeatherMap)

**Free tier available** - 1000 calls/day

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. In `index.html`, find the `loadWeather()` function (around line 500)
4. Replace this code:

```javascript
async function loadWeather() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';
        const location = state.settings.location;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
        );
        const data = await response.json();

        state.data.weather = {
            location: data.name,
            temp: Math.round(data.main.temp),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed),
            icon: getWeatherIcon(data.weather[0].main)
        };
    } catch (error) {
        console.error('Weather API error:', error);
        state.data.weather = { error: 'Failed to load weather data' };
    }
}

function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Snow': '❄️',
        'Thunderstorm': '⛈️',
        'Drizzle': '🌦️',
        'Mist': '🌫️'
    };
    return icons[condition] || '🌤️';
}
```

### 2. Cryptocurrency API (CoinGecko)

**Already integrated!** - No API key needed for basic usage

The crypto widget uses CoinGecko's free API which is already working. No changes needed!

### 3. Soccer Scores (API-Football)

**Free tier** - 100 calls/day

1. Sign up at [API-Football](https://www.api-football.com/)
2. Get your API key
3. Replace `loadSoccer()` function:

```javascript
async function loadSoccer() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';

        // Man United team ID: 33, Real Madrid team ID: 541
        const teams = [33, 541];
        const matches = [];

        for (const teamId of teams) {
            const response = await fetch(
                `https://v3.football.api-sports.io/fixtures?team=${teamId}&last=1`,
                {
                    headers: {
                        'x-apisports-key': apiKey
                    }
                }
            );
            const data = await response.json();

            if (data.response && data.response.length > 0) {
                const match = data.response[0];
                matches.push({
                    league: match.league.name,
                    homeTeam: match.teams.home.name,
                    awayTeam: match.teams.away.name,
                    homeScore: match.goals.home,
                    awayScore: match.goals.away,
                    status: match.fixture.status.short
                });
            }
        }

        state.data.soccer = matches;
    } catch (error) {
        console.error('Soccer API error:', error);
        state.data.soccer = { error: 'Failed to load soccer data' };
    }
}
```

### 4. Basketball Scores (API-Sports NBA)

**Free tier** - 100 calls/day

1. Sign up at [API-Sports](https://api-sports.io/)
2. Use the same API key as soccer
3. Replace `loadBasketball()` function:

```javascript
async function loadBasketball() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';

        const response = await fetch(
            'https://v2.nba.api-sports.io/games?league=standard&season=2025',
            {
                headers: {
                    'x-apisports-key': apiKey
                }
            }
        );
        const data = await response.json();

        state.data.basketball = data.response.slice(0, 3).map(game => ({
            league: 'NBA',
            homeTeam: game.teams.home.name,
            awayTeam: game.teams.visitors.name,
            homeScore: game.scores.home.points,
            awayScore: game.scores.visitors.points,
            status: game.status.long
        }));
    } catch (error) {
        console.error('Basketball API error:', error);
        state.data.basketball = { error: 'Failed to load basketball data' };
    }
}
```

### 5. News APIs (NewsAPI)

**Free tier** - 100 requests/day

1. Sign up at [NewsAPI](https://newsapi.org/)
2. Get your API key
3. Replace news loading functions:

```javascript
async function loadAINews() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=artificial+intelligence+OR+AI+OR+machine+learning&sortBy=publishedAt&language=en&apiKey=${apiKey}`
        );
        const data = await response.json();

        state.data.ai = data.articles.slice(0, 5).map(article => ({
            title: article.title,
            source: article.source.name,
            time: getTimeAgo(article.publishedAt),
            url: article.url
        }));
    } catch (error) {
        console.error('AI News error:', error);
        state.data.ai = { error: 'Failed to load AI news' };
    }
}

async function loadPMNews() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=agile+OR+scrum+OR+project+management+OR+lean+six+sigma&sortBy=publishedAt&language=en&apiKey=${apiKey}`
        );
        const data = await response.json();

        state.data.pm = data.articles.slice(0, 5).map(article => ({
            title: article.title,
            source: article.source.name,
            time: getTimeAgo(article.publishedAt),
            url: article.url
        }));
    } catch (error) {
        console.error('PM News error:', error);
        state.data.pm = { error: 'Failed to load PM news' };
    }
}

async function loadFinanceNews() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=(cryptocurrency+OR+bitcoin+OR+finance+OR+real+estate)+AND+Cleveland&sortBy=publishedAt&language=en&apiKey=${apiKey}`
        );
        const data = await response.json();

        state.data.finance = data.articles.slice(0, 5).map(article => ({
            title: article.title,
            source: article.source.name,
            time: getTimeAgo(article.publishedAt),
            url: article.url
        }));
    } catch (error) {
        console.error('Finance News error:', error);
        state.data.finance = { error: 'Failed to load finance news' };
    }
}

async function loadBreakingNews() {
    try {
        const apiKey = 'YOUR_API_KEY_HERE';
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await response.json();

        state.data.news = data.articles.slice(0, 5).map(article => ({
            title: article.title,
            source: article.source.name,
            time: getTimeAgo(article.publishedAt),
            url: article.url
        }));
    } catch (error) {
        console.error('Breaking News error:', error);
        state.data.news = { error: 'Failed to load news' };
    }
}

// Helper function to format time
function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}
```

### 6. Cleveland Real Estate (Zillow API Alternative)

For real estate data, consider using:
- [Realtor.com API](https://rapidapi.com/apidojo/api/realtor)
- [Zillow alternatives on RapidAPI](https://rapidapi.com/hub)

## Alternative: Using RSS Feeds

If you prefer not to use paid APIs, you can use RSS feeds:

```javascript
// Example using RSS2JSON service (free, no API key needed)
async function loadRSSFeed(url, category) {
    try {
        const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
        );
        const data = await response.json();

        return data.items.slice(0, 5).map(item => ({
            title: item.title,
            source: data.feed.title,
            time: getTimeAgo(item.pubDate),
            url: item.link
        }));
    } catch (error) {
        console.error(`RSS Feed error for ${category}:`, error);
        return { error: `Failed to load ${category}` };
    }
}

// Example RSS feeds for your interests:
// - AI: https://feeds.feedburner.com/venturebeat/SZYF
// - PM: https://www.scrum.org/resources/blog/rss.xml
// - Tech: https://techcrunch.com/feed/
```

## Customization Tips

### Change Colors

Edit the CSS variables in the `:root` section:

```css
:root {
    --accent-color: #3b82f6;  /* Change to your preferred color */
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

### Add More Widgets

1. Add a new widget option in settings
2. Create a load function for your data
3. Create a widget renderer
4. Add it to the `renderWidgets()` function

### Adjust Auto-Refresh Time

In the `setupAutoRefresh()` function, change the interval:

```javascript
// Change from 6 hours to 1 hour
setInterval(() => {
    loadAllData();
}, 1 * 60 * 60 * 1000); // 1 hour
```

## Deployment

### Option 1: Local File
Simply open `index.html` in your browser. Works offline with cached data!

### Option 2: Host Online
Upload to any static hosting service:
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)
- Firebase Hosting (free)

### Option 3: Browser Extension
Convert it to a custom new tab page browser extension!

## Browser Compatibility

✅ Chrome/Edge (recommended)
✅ Firefox
✅ Safari
✅ Opera

## Privacy

All data is stored locally in your browser (localStorage). No data is sent to any external servers except the APIs you configure.

## Troubleshooting

**Data not loading?**
- Check your internet connection
- Verify API keys are correct
- Check browser console for errors (F12)

**Settings not saving?**
- Ensure localStorage is enabled in your browser
- Try clearing cache and refreshing

**CORS errors?**
- Some APIs require a backend proxy
- Consider using a CORS proxy service for development
- Or set up a simple backend server

## Future Enhancements

- [ ] Baseball scores integration
- [ ] Export settings to file
- [ ] Multiple dashboard layouts
- [ ] Widget drag-and-drop reordering
- [ ] Notifications for important updates
- [ ] Data visualization charts
- [ ] Calendar integration
- [ ] Custom RSS feed additions

## License

Free to use and modify for personal use!

## Support

For issues or questions, feel free to customize the code to fit your needs. This is your personal dashboard - make it yours!

---

**Enjoy your personalized dashboard! 🚀**
