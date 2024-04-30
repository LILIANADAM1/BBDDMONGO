const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const cors = require('cors');

let app = express();

app.use(cors({
    origin: ['http://localhost:8080']
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/NetAlmix', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
if (!db) {
    console.log("ERROR connecting db");
} else {
    console.log("DB connected successfully");
}

var port = process.env.port || 8080;

app.get('/info', (req, res) => res.send('El mejor WS de la historia'));

app.listen(port, function () {
    console.log("Running on port: " + port);
});

app.use('/', apiRoutes);