const express = require('express');
const path = require('path');
// const notes = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
const dbName = ('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

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

app.post('/api/notes', (req, res) => {
    const notes = readFromFile('db/db.json', 'utf8')
        .then((notes) => {
            const parsedNotes = JSON.parse(notes);
            const { title, text } = req.body;
            console.info((`${title} ${text} means we've gotten this far`))
            const finalNote = { title, text };
            parsedNotes.push(finalNote);
            writeToFile('db/db.json', JSON.stringify(parsedNotes))
                .then((updatedNotes) => {
                    res.json(updatedNotes);
                })        
        })
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

console.log("what about nooow? HUH?!");