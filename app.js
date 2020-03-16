const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.get('/', function(req, res) {
    res.send('Début application TP');
});

app.listen(process.env.PORT, () => console.log(`Front app listening on port ${process.env.PORT}!`));