const express = require('express');
const router = express.Router();

const contentController = require('./contentController');

// Rutas para películas y series
router.get('/movies', contentController.getAllMovies);
router.get('/series', contentController.getAllSeries);
router.get('/genre/:genre', contentController.getByGenre);
router.get('/top10/:contentType', contentController.getTop10ByRating);

router.post('/movies', contentController.createMovies);
router.post('/serie', contentController.createSeries);

module.exports = router;
