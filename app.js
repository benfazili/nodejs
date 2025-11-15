const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// ===== Routes =====

// Home route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Ben's Cool Server 😎</h1>
        <p>Try these routes:</p>
        <ul>
            <li>/about</li>
            <li>/fun</li>
            <li>/theme?mode=dark|light|default</li>
        </ul>
    `);
});

// About route
app.get('/about', (req, res) => {
    res.send(`
        <h2>About Ben's Server</h2>
        <p>Powered by Node.js & Railway 🚀</p>
        <p>Created by Benfazili 🔥</p>
    `);
});

// Fun route - random quotes
const quotes = [
    "Stay hustling 💪",
    "Cool vibes only 😎",
    "Dream big, bruv 🚀",
    "Keep grinding, always 🔥",
    "Positive vibes only ✨"
];
app.get('/fun', (req, res) => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    res.send(`<h2>Fun Quote:</h2><p>${random}</p>`);
});

// Theme route - dark/light/default
app.get('/theme', (req, res) => {
    const mode = req.query.mode || 'default';
    let bg = '#fff';
    let text = '#000';

    if(mode === 'dark') {
        bg = '#121212';
        text = '#ffffff';
    } else if(mode === 'light') {
        bg = '#f5f5f5';
        text = '#111111';
    }

    res.send(`
        <body style="background-color:${bg}; color:${text}; font-family:sans-serif;">
            <h1>Theme: ${mode}</h1>
            <p>Ben's server supports dark/light/default mode 🌗</p>
            <p>Try /theme?mode=dark or /theme?mode=light</p>
        </body>
    `);
});

// 404 route
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found 😢</h1><p>Try /, /about, /fun, or /theme</p>');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
