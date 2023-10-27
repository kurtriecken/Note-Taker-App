const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET route for retrieving notes from the db
notes.get('/', (req, res) => {
    console.info('attempted get request to api/notes');

    readFromFile('./db/db.json')
        .then(data => res.json(JSON.parse(data)));
});



// POST route for adding a note 
notes.post('/', (req, res) => {
    // Destructure the request
    const { title, text } = req.body;

    // If both title and text are present
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };


        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newFeedback,
        };

        res.json(response);
    }
    else {
        res.json('Error in posting feedback');
    }
});

module.exports = notes;