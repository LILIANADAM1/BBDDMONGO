const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
    title: String,
    duration: Number,
    description: String
});

const seasonSchema = mongoose.Schema({
    episodes: [episodeSchema]
});

const seriesSchema = mongoose.Schema({
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
        enum: ['series'],
        default: 'series'
    },
    numViews: {
        type: Number,
        default: 0
    },
    awards: [String],
    seasons: [seasonSchema]
});

module.exports = mongoose.model('Series', seriesSchema);
