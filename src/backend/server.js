const express = require('express');

import bodyParser from 'body-parser';
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
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

app.listen(app.get('port'), () => {
    console.log(`server is running on port ${app.get('port')}`);
});
