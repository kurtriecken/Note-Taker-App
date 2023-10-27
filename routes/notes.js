const notes = require('express').Router();

// GET route for retrieving notes from the db
notes.get('/', (req, res) => {
    console.log('attempted get request to api/notes');
})

// POST route for adding a note 
module.exports = notes;