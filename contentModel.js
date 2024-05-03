const mongoose = require('mongoose');

const ContenidoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    tipo: {
        type: String,
        enum: ['pelicula', 'serie', 'documental'], 
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    valoraciones: [{
        nick: {
            type: String,
            required: true,
            trim: true
        },
        puntuacion: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        comentario: {
            type: String,
            trim: true
        }
    }],
    generos: {
        type: [String],
        required: true
    },
    numero_reproducciones: {
        type: Number,
        default: 0
    },
    premios: {
        type: [String]
    },
    duracion: {
        type: Number,
        min: 1 // Duración mínima de 1 minuto
    },
    director: {
        type: String,
        trim: true
    },
    temporadas: [{
        numero: {
            type: Number,
            required: true,
            min: 1
        },
        capitulos: [{
            titulo: {
                type: String,
                required: true,
                trim: true
            },
            duracion: {
                type: Number,
                required: true,
                min: 1 // Duración mínima de 1 minuto
            },
            descripcion: {
                type: String,
                required: true
            }
        }]
    }],
    expertos: [{
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        apellido: {
            type: String,
            required: true,
            trim: true
        },
        cargo: {
            type: String,
            required: true,
            trim: true
        }
    }]
}, { collection: 'Contenido' });

module.exports = mongoose.model('Contenido', ContenidoSchema);
