const mongoose = require('mongoose');

// Schema para contenido (películas y series)
const contentSchema = new mongoose.Schema({
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
    ratings: [{
        nick: String,
        score: Number,
        comment: String
    }],
    genres: [String],
    views: {
        type: Number,
        default: 0
    },
    awards: [String],
    // Película específica
    duration: Number,
    director: String,
    // Serie específica
    seasons: [{
        title: String,
        episodes: [{
            title: String,
            duration: Number,
            description: String
        }]
    }]
});

module.exports = mongoose.model('Content', contentSchema);
