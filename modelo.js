class Contenido {
    constructor(id, titulo, tipo, descripcion, valoraciones, generos, numReproducciones, premios) {
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.valoraciones = valoraciones;
        this.generos = generos;
        this.numReproducciones = numReproducciones;
        this.premios = premios;
    }
}


class Pelicula extends Contenido {
    constructor(id, titulo, descripcion, valoraciones, generos, numReproducciones, premios, duracion, director) {
        super(id, titulo, 'pelicula', descripcion, valoraciones, generos, numReproducciones, premios);
        this.duracion = duracion;
        this.director = director;
    }
}


class Serie extends Contenido {
    constructor(id, titulo, descripcion, valoraciones, generos, numReproducciones, premios, capitulos) {
        super(id, titulo, 'serie', descripcion, valoraciones, generos, numReproducciones, premios);
        this.capitulos = capitulos;
    }
}


module.exports = { Contenido, Pelicula, Serie };
