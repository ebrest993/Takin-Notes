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

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));
// app.use('/api', apiRoutes); //api routes in one file
// app.use('/', htmlRoutes); // html routes in one file

app.post('/api/notes', (req, res) => {
    const notes = readFromFile('db/db.json', 'utf8')
        .then((notes) => {
            const parsedNotes = JSON.parse(notes);
            const { title, text } = req.body;
            console.info((`${title} and his friend ${text} means we've gotten this far`))
            // include uuid to assign id's
            const finalNote = { title, text };
            parsedNotes.push(finalNote);
            writeToFile('db/db.json', JSON.stringify(parsedNotes))
                .then((updatedNotes) => {
                    res.json(updatedNotes);
                })        
        })
});