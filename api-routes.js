const express = require('express');
const router = express.Router();

const contentController = require('./contentController');

// Rutas para películas y series
router.get('/NetAlmix/documental', contentController.getAllDocumental);
router.get('/NetAlmix/movies', contentController.getAllMovies);
router.get('/series', contentController.getAllSeries);
router.get('/genre/:genre', contentController.getByGenre);
router.get('/top10/:contentType', contentController.getTop10ByRating);

router.post('/movies', contentController.createMovie);
router.post('/serie', contentController.createSeries);
router.post('/documental', contentController.createDocumental);

module.exports = router;
