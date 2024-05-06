const express = require('express');
const router = express.Router();
const contentController = require('./controller');

// Rutas para operaciones CRUD
router.post('/content', contentController.createContent);
router.delete('/content/:id', contentController.deleteContent);
router.put('/content/:id', contentController.updateContent);

// Consultas específicas
router.get('/series', contentController.getAllSeries);
router.get('/movies', contentController.getAllMovies);
router.get('/content/genre/:genre', contentController.getContentByGenre);
router.get('/top10/:type', contentController.getTop10ByRating);


module.exports = router;

