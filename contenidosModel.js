var mongoose = require('mongoose');

// Definir subesquemas reutilizables
var valoracionSchema = mongoose.Schema({
    Nick: String,
    Puntuacion: Number,
    Comentario: String
});

var capituloSchema = mongoose.Schema({
    Titulo: String,
    Duracion: String,
    Descripcion: String
});

// Esquema principal para contenido (película o serie)
var contenidoSchema = mongoose.Schema({
    Titulo: {
        type: String,
        required: true
    },
    TipoContenido: {
        type: String,
        enum: ['serie', 'pelicula'], // Tipo de contenido: serie o película
        required: true
    },
    Descripcion: String,
    Valoraciones: [valoracionSchema],
    Generos: [String],
    NumeroReproducciones: Number,
    Premios: [String],
    Pelicula: {
        Duracion: String,
        Director: String
    },
    Serie: {
        Temporadas: [{
            Numero: Number,
            Capitulos: [capituloSchema]
        }]
    }
}, { collection: 'Contenidos' });

var Contenidos = mongoose.model('Contenidos', contenidoSchema);

module.exports = Contenidos;
