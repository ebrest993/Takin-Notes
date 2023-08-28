const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => res.send('/public/index.html'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

console.log("what about now?")

// need to create a window to be utilized in index.js