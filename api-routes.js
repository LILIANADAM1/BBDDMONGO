const express = require('express');
const router = express.Router();

const contentController = require('./contentController');

// Rutas para películas y series
router.get('/movies', contentController.getAllMovies);
router.get('/series', contentController.getAllSeries);
router.get('/genre/:genre', contentController.getByGenre);
router.get('/top10/:contentType', contentController.getTop10ByRating);

router.post('/movies', contentController.createMovie);
router.post('/series', contentController.createMovie);

module.exports = router;
