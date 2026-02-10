# Quick Start Guide 🚀

## Step 1: Open Your Dashboard

### On Mac:
```bash
cd personal-dashboard
open index.html
```

### On Windows:
```bash
cd personal-dashboard
start index.html
```

### Or:
Simply double-click `index.html` in your file browser!

---

## Step 2: First Time Setup

1. **Click the ⚙️ Settings button** in the top right
2. **Enter your location** (e.g., "Cleveland, OH")
3. **Check/uncheck widgets** you want to see
4. **Click "💾 Save Settings"**

Your settings are automatically saved and will persist!

---

## Step 3: Customize Your Experience

### Toggle Dark/Light Mode
- Click the 🌙/☀️ button in the header
- Your preference is saved automatically

### Refresh Data
- Click the 🔄 Refresh button
- Or wait - it auto-refreshes every 6 hours!

### Add More Cryptocurrencies
1. Go to Settings
2. Add coins in the "Additional Cryptocurrencies" field
3. Separate with commas: `ethereum, cardano, solana`
4. Save!

---

## What You're Seeing (Right Now)

Currently, the dashboard uses **demo/mock data** to show you how it works.

### What's Already Working:
✅ **Cryptocurrency prices** - Real live data from CoinGecko!
✅ **Dark/Light mode toggle**
✅ **Settings persistence**
✅ **Mobile responsive design**
✅ **Auto-refresh every 6 hours**

### What's Using Demo Data:
⏳ Weather
⏳ Soccer scores
⏳ Basketball scores
⏳ News articles

---

## Next Steps: Getting Live Data

### For Live Data (Optional):

**Easy (5 minutes):**
- Crypto is already live! No setup needed.

**Medium (15 minutes):**
- Sign up for [OpenWeatherMap](https://openweathermap.org/api) for real weather
- Free tier gives you 1000 calls/day

**Advanced (30 minutes):**
- Get [NewsAPI](https://newsapi.org/) key for real news (100/day free)
- Get [API-Football](https://www.api-football.com/) for live scores (100/day free)

Check the **README.md** file for detailed API integration instructions!

---

## Tips & Tricks

### Keyboard Shortcuts
- `F12` - Open browser console to see what's happening
- `Ctrl/Cmd + R` - Refresh the page
- `Ctrl/Cmd + Shift + R` - Hard refresh (clears cache)

### Clear All Settings
Open browser console (F12) and type:
```javascript
localStorage.clear()
location.reload()
```

### Change Auto-Refresh Time
Edit `index.html` and find this line (~line 480):
```javascript
setInterval(() => {
    loadAllData();
}, 6 * 60 * 60 * 1000); // Change 6 to your preferred hours
```

### Change Colors
Find the `:root` CSS variables (around line 10) and change:
```css
--accent-color: #3b82f6;  /* Your preferred color */
```

---

## Troubleshooting

**Dashboard won't load?**
- Make sure you're opening the file in a modern browser (Chrome, Firefox, Safari, Edge)

**Settings won't save?**
- Check if localStorage is enabled in your browser settings
- Some browsers block localStorage for local files - try hosting on a local server

**Crypto prices not showing?**
- Check your internet connection
- CoinGecko API might be down (rare)

**Want to start fresh?**
- Delete the `personal-dashboard` folder
- Ask me to recreate it!

---

## What's Next?

1. **Enjoy your dashboard!** It works great with demo data
2. **Add API keys** when you're ready for live data
3. **Customize** colors, widgets, and layout to your liking
4. **Share** with friends if you want!

---

## Need Help?

- Check **README.md** for detailed documentation
- Look at the code comments in `index.html`
- Browser console (F12) shows helpful error messages

---

**You're all set! Enjoy your personal dashboard! 🎉**
