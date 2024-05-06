const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;


const { MongoClient } = require('mongodb');

mongoose.connect('mongodb://localhost/NetAlmix', {
  useNewUrlParser: true,  
  useUnifiedTopology: true  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
