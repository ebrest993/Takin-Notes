const express = require('express');
const path = require('path');
const formData = require('formdata');

const PORT = 3001;

// need to create a window to be utilized in index.js

const form = express();

form.use(express.static('public'));

form.get('/', (req, res) => res.send('This was the first GET function you wrote'));

form.get('/notes', (req, res) => path.join(__dirname, '/Develop/public/notes.html'));

console.log("is this working?")