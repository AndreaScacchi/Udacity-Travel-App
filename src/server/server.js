let journeyData = {};

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

// Server
const port = 3000;
app.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
});

// GET routes
app.get('/all', (req, res) => {
    res.sendFile('dist/index.html');
});

app.get('/test', async (req, res) => {
    res.json();
});

// POST routes
app.post('/add', (req, res) => {
    journeyData = req.body;
    res.send(journeyData);
});

module.exports = app;