const express = require('express');
const path = require('path');

const PORT = 3001;

// need to create a window to be utilized in index.js

const form = express();

form.use(express.static('public'));

form.get('/', (req, res) => res.send('/public/index.html'));

form.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

form.listen(PORT, () => console.log(`http://localhost:${PORT}`));

console.log("is this working?")