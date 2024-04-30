const express = require('express');
const bodyParser = require('body-parser');
const controlador = require('./controlador');

// Inicializar la aplicación Express
const app = express();

// Configurar bodyParser para analizar solicitudes JSON
app.use(bodyParser.json());

// Ruta para agregar nuevo contenido
app.post('/contenido', (req, res) => {
    const nuevoContenido = req.body;
    controlador.agregarContenido(nuevoContenido);
    res.status(201).send('Contenido agregado correctamente.');
});

// Ruta para eliminar contenido por ID
app.delete('/contenido/:id', (req, res) => {
    const id = req.params.id;
    controlador.eliminarContenido(id);
    res.send('Contenido eliminado correctamente.');
});

// Ruta para actualizar contenido por ID
app.put('/contenido/:id', (req, res) => {
    const id = req.params.id;
    const contenidoActualizado = req.body;
    controlador.actualizarContenido(id, contenidoActualizado);
    res.send('Contenido modificado correctamente.');
});

// Ruta para obtener todas las series
app.get('/series', (req, res) => {
    const series = controlador.obtenerSeries();
    res.json(series);
});

// Ruta para obtener todas las películas
app.get('/peliculas', (req, res) => {
    const peliculas = controlador.obtenerPeliculas();
    res.json(peliculas);
});

// Ruta para obtener contenido por género
app.get('/contenido/genero/:genero', (req, res) => {
    const genero = req.params.genero.toLowerCase();
    const resultados = controlador.obtenerContenidoPorGenero(genero);
    res.json(resultados);
});

// Ruta para obtener el top 10 de un tipo de contenido
app.get('/top10/:tipo', (req, res) => {
    const tipo = req.params.tipo.toLowerCase();
    const top10 = controlador.obtenerTop10(tipo);
    res.json(top10);
});

// Puerto de escucha para la aplicación
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
