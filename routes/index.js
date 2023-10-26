const express = require('express');

// Import modular route to notes
const notesRouter = require('./notes');

const app = express();


app.use('/notes', notesRouter);

module.exports = app;