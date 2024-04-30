const express = require('express');
const bodyParser = require('body-parser');
const controlador = require('./controlador');


const app = express();
app.use(bodyParser.json());


app.post('/contenido', (req, res) => {
    const nuevoContenido = req.body;
    controlador.agregarContenido(nuevoContenido);
    res.status(201).send('Contenido agregado correctamente.');
});


app.delete('/contenido/:id', (req, res) => {
    const id = req.params.id;
    controlador.eliminarContenido(id);
    res.send('Contenido eliminado correctamente.');
});


app.put('/contenido/:id', (req, res) => {
    const id = req.params.id;
    const contenidoActualizado = req.body;
    controlador.actualizarContenido(id, contenidoActualizado);
    res.send('Contenido modificado correctamente.');
});


app.get('/series', (req, res) => {
    const series = controlador.obtenerSeries();
    res.json(series);
});


app.get('/peliculas', (req, res) => {
    const peliculas = controlador.obtenerPeliculas();
    res.json(peliculas);
});


app.get('/contenido/:genero', (req, res) => {
    const genero = req.params.genero.toLowerCase();
    const resultados = controlador.obtenerContenidoPorGenero(genero);
    res.json(resultados);
});


app.get('/top10/:tipo', (req, res) => {
    const tipo = req.params.tipo.toLowerCase();
    const top10 = controlador.obtenerTop10(tipo);
    res.json(top10);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
