const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contentType: { type: String, enum: ['serie', 'movie'], required: true },
  description: { type: String },
  ratings: [{ nick: String, score: Number, comment: String }],
  genres: [{ type: String }],
  views: { type: Number, default: 0 },
  awards: [{ type: String }],
  // Propiedades específicas para películas
  duration: { type: Number }, // Duración en minutos
  director: { type: String },
  // Propiedades específicas para series
  seasons: [{
    title: { type: String },
    episodes: [{
      title: { type: String },
      duration: { type: Number },
      description: { type: String }
    }]
  }]
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
