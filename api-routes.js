const express = require('express');
const router = express.Router();

const contentController = require('./contentController');

router.get('/documental', contentController.getAllDocumental);
router.get('/movies', contentController.getAllMovies);
router.get('/series', contentController.getAllSeries);
router.get('/genre/:genre', contentController.getByGenre);
router.get('/top10/:contentType', contentController.getTop10ByRating);

router.post('/movies', contentController.createMovie);
router.post('/serie', contentController.createSeries);
router.post('/documental', contentController.createDocumental);

module.exports = router;
