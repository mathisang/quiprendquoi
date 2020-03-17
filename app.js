const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {title: "Qui prend quoi ?"});
});

app.post('/party', (req, res) => {
    axios
        .post(`${process.env.API_URL}/party`, req.body)
        .then(({data}) => console.log(data))
        .catch((err) => console.error(err));
});

app.get('/party/:id', function (req, res) {
    res.render('party', {title: "Qui prend quoi ? - Mon évenement"});
});

app.listen(process.env.PORT, () =>
    console.log(`Front app listening on port ${process.env.PORT}!`)
);