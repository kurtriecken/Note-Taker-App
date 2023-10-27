const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

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
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    }
    else {
        res.json('Error in writing note');
    }
});

// DELETE route for removing a note
notes.delete('/:id', (req, res) => {
    console.log(`I found your ID! it is: ${req.params.id}`);

    readFromFile('./db/db.json')
        .then(data =>
            // Filter out the element with id requested
            (JSON.parse(data)).filter(({ id }) => id !== req.params.id)
        )
        .then(arr => {
            writeToFile('./db/db.json', arr);
            res.json('Success!');
        });
})

module.exports = notes;