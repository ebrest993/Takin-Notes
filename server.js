const express = require('express');
const path = require('path');
const test = require('uuid');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
// const deleteFromFile = util.promisify(fs.unlink);
const dbName = ('./db/db.json');
// const idLog = require('./public/assets/js/index.js');

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

// app.delete(`/api/notes/:id`, (req, res) => {
//     res.send("DELETE Request Called")
//     console.log("That's me")
//     const deleteHandler = deleteFromFile('db/db.json', 'utf8')
//         .then((deleteHandler) => {
//             console.log(deleteHandler);
            // const removeNotes = JSON.parse(deleteHandler.id);
            // const { title, text } = req.body;
            // console.info((`And this means you got to the delete route`))
            // const finalNote = { title, text };
            // removeNotes.push(finalNote);
            // writeToFile('db/db.json', JSON.stringify(parsedNotes))
            //     .then((updatedNotes) => {
            //         res.json(updatedNotes); 
            //     })        
//         }) 
// });

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

// Okay so I just went and cloned your repo
// and I see that the first thing that I would change is that you need your line 51 of your server address to include :id  at the end of your route path
// app.delete(/api/notes/:id`, (req, res) => {`
// Like so
// The next thing is when you are saving notes, all of your notes need to have a unique id  key
// So on your line 42, const finalNote = { title, text };  try adding some type of method like uuid to generate a unique id for the note
// Here is the docs for that https://www.npmjs.com/package/uuid
// Once you have both of those lines added
// the final step is in your delete route you can access the id of the button clicked using const id = req.params.id  and that will take the id of the note that the delete button is clicked from