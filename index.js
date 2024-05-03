const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/NetAlmix', {
  useNewUrlParser: true,  
  useUnifiedTopology: true  
});

// Verificar la conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});


// Configurar rutas y middleware
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
