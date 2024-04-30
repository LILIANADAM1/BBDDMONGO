const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    ratings: [{
        nick: String,
        score: Number,
        comment: String
    }],
    genres: [String],
    type: {
        type: String,
        enum: ['movie'],
        default: 'movie'
    },
    numViews: {
        type: Number,
        default: 0
    },
    awards: [String],
    duration: Number,
    director: String
});

module.exports = mongoose.model('Movie', movieSchema);