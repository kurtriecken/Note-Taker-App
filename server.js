// Importing core modules
const express = require('express');
const api = require('path');


const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('./api', api);

app.use(express.static('public'));