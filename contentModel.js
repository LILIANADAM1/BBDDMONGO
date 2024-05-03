const mongoose = require('mongoose');

// Schema para valoraciones
const RatingSchema = new mongoose.Schema({
    nick: String,
    score: {
        type: Number,
        min: 1,
        max: 10
    },
    comment: String
});

// Schema para episodios de series
const EpisodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Schema principal para contenido (películas y series)
const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        enum: ['serie', 'pelicula'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ratings: [RatingSchema], // Array de valoraciones
    genres: [String],
    views: {
        type: Number,
        default: 0
    },
    awards: [String],
    // Campos específicos para películas
    duration: {
        type: Number,
        required: function() {
            return this.contentType === 'pelicula'; // Requerido solo para películas
        }
    },
    director: {
        type: String,
        required: function() {
            return this.contentType === 'pelicula'; // Requerido solo para películas
        }
    },
    // Campos específicos para series
    seasons: [{
        title: {
            type: String,
            required: true
        },
        episodes: [EpisodeSchema] // Array de episodios por temporada
    }]
});

// Crear modelo 'Content' basado en el schema ContentSchema
const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
