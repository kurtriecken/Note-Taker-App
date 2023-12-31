// Importing core modules
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3000;

const app = express();

// Import custom middleware for api request alerts
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Route for 404 page
app.get('/404', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);

// GET route for homepage (wildcard)
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App open and listening at http://localhost:${PORT}`)
);