let { Contenido, Pelicula, Serie } = require('./modelo');


let database = [];


function agregarContenido(contenido) {
    database.push(contenido);
}


function eliminarContenido(id) {
    database = database.filter(contenido => contenido.id !== id);
}


function actualizarContenido(id, contenidoActualizado) {
    database = database.map(contenido => {
        if (contenido.id === id) {
            return { ...contenido, ...contenidoActualizado };
        }
        return contenido;
    });
}


function obtenerSeries() {
    return database.filter(contenido => contenido.tipo === 'serie');
}


function obtenerPeliculas() {
    return database.filter(contenido => contenido.tipo === 'pelicula');
}


function obtenerContenidoPorGenero(genero) {
    return database.filter(contenido => contenido.generos.includes(genero.toLowerCase()));
}


function obtenerTop10(tipo) {
    return database
        .filter(contenido => contenido.tipo === tipo.toLowerCase())
        .sort((a, b) => calcularPuntuacionMedia(b) - calcularPuntuacionMedia(a))
        .slice(0, 10);
}


function calcularPuntuacionMedia(contenido) {
    if (contenido.valoraciones.length === 0) return 0;
    const totalPuntuacion = contenido.valoraciones.reduce((acc, cur) => acc + cur.puntuacion, 0);
    return totalPuntuacion / contenido.valoraciones.length;
}


module.exports = {
    agregarContenido,
    eliminarContenido,
    actualizarContenido,
    obtenerSeries,
    obtenerPeliculas,
    obtenerContenidoPorGenero,
    obtenerTop10
};


