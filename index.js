const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/NetAlmix', {
  useNewUrlParser: true,  // Ya no es necesario en versiones recientes
  useUnifiedTopology: true  // Ya no es necesario en versiones recientes
});

// Verificar la conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.get('/movies', (req, res) => {
    // Aquí deberías escribir el código para obtener y devolver las películas
    res.send('Aquí están todas las películas');
});
// Configurar rutas y middleware
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
