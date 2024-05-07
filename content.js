const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contentType: { type: String, enum: ['serie', 'movie'], required: true },
  description: { type: String },
  ratings: [{ nick: String, score: Number, comment: String }],
  genres: [{ type: String }],
  views: { type: Number, default: 0 },
  awards: [{ type: String }],
  duration: { type: Number }, 
  director: { type: String },
  
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
