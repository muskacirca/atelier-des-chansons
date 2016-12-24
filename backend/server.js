const express = require('express');

const path = require('path');
import bodyParser from 'body-parser';

import ContactService from './data/ContactService'
import SongService from './data/SongService'

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', (process.env.PORT || 3001));

app.use('/style', express.static(path.resolve(__dirname, '../frontend/src/lib')));

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('../frontend/build'));
    app.use('/static/js', express.static(path.resolve(__dirname, '../frontend/build/static/js')));

    app.use('/static/css', express.static(path.resolve(__dirname, '../frontend/build/static/css')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });
}

app.post('/rs/contact', function(req, res) {
    let contact = req.body
    ContactService.insertContact(contact.name, contact.email);
});

app.get('/songs', function(req, res) {
    SongService.findAll();
    res.send()
});


app.listen(app.get('port'), () => {
    console.log(`server is running on port ${app.get('port')}`);
});
