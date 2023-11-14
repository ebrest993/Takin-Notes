const express = require('express');
const path = require('path');
const test = require('uuid');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
const dbName = ('./db/db.json');

const PORT = process.env.PORT||3001;

const app = express();

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    const notes = readFromFile('db/db.json', 'utf8')
        .then((notes) => {
            const parsedNotes = JSON.parse(notes);
            console.log();
            res.json(parsedNotes);
        })
});
