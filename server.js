var express = require('express');
var path = require('path');

const server_port = process.env.PORT || 3000

var app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "build/index.html"));
});

app.get('/static/js/main.40b0c418.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, "build/static/js/main.40b0c418.js"));
});

app.use('/static/css', express.static(path.resolve(__dirname, 'build/static/css')));
app.use('/static/media', express.static(path.resolve(__dirname, 'build/static/media')));

app.listen(server_port, (err) => {
    if(err) return console.log(err);
    console.log('Server is now running on port ' + server_port);
});