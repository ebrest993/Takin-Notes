const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
// const index = require('./public/assets/js/index');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.send('/public/index.html'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {
console.info(`"${req.body}" means we've gotten this far`)
console.info();}
);

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

console.log("what about nooow? HUH?!");

// need to create a window to be utilized in index.js