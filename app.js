const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

// Affichage page index
app.get('/', function (req, res) {
    res.render('index', {title: "Qui prend quoi ?"});
});

// Création nouvel évènement
app.post('/party', (req, res) => {
    axios
        .post(`${process.env.API_URL}/party`, req.body)
        .then(({data}) => res.redirect(`/party/${data._id}`))
        .catch((err) => res.send(err));
});

// Récupération évènement
app.get('/party/:id', function (req, res) {
    axios
        .get(`${process.env.API_URL}/party/${req.params.id}`)
        .then(({ data }) =>
            res.render('party', {
                party: data,
                title: data.name,
                url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
            }),
        )
        .catch((err) => console.log(err));
});

// Création item pour évènement
app.post('/party/:id/items', (req, res) => {
    axios
        .post(`${process.env.API_URL}/party/${req.params.id}/items`, req.body)
        .then(({data}) => res.redirect(`${process.env.FRONT_URL}:${process.env.PORT}/party/${req.params.id}`))
        .catch((err) => res.send(err));
});

// Suppression item pour évènement
app.post('/party/:party_id/items/:item_id/remove', (req, res) => {
    axios
        .delete(`${process.env.API_URL}/party/${req.params.party_id}/items/${req.params.item_id}`, req.body)
        .then(({data}) => res.redirect(`${process.env.FRONT_URL}:${process.env.PORT}/party/${req.params.party_id}`))
        .catch((err) => res.send(err));
});

app.listen(process.env.PORT, () =>
    console.log(`Front app listening on port ${process.env.PORT}!`)
);