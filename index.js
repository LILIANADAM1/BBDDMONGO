const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const cors = require('cors');

let app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080']
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/NetAlmix', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost/NetAlmix', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('¡Conexión exitosa a MongoDB!');
});


var port = process.env.port || 8080;

app.get('/info', (req, res) => res.send('El mejor WS de la historia'));

app.listen(port, function () {
    console.log("Running on port: " + port);
});

app.use('/', apiRoutes);