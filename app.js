const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index', { title: "Qui prend quoi ?"});
});

app.post('/party', function(req, res) {
    console.log(req.body);
    res.send("Post OK");
});

app.listen(process.env.PORT, () => console.log(`Front app listening on port ${process.env.PORT}!`));