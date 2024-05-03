const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost/NetAlmix', {
  useNewUrlParser: true,  
  useUnifiedTopology: true  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.use(bodyParser.json());
app.use('/documentales', documentalRoutes);

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a la base de datos MongoDB');

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});