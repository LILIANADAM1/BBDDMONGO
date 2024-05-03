const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const documentalRoutes = require('./documentales');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/documentales', documentalRoutes);

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a la base de datos MongoDB');

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});
