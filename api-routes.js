const express = require('express');
const router = express.Router();
const movieController = require('./movieController');
const seriesController = require('./seriesController');

// Películas
router.route('/movies')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie);

router.route('/movies/:movie_id')
    .get(movieController.getMovie)
    .put(movieController.updateMovie)
    .delete(movieController.deleteMovie);

// Series
router.route('/series')
    .get(seriesController.getAllSeries)
    .post(seriesController.createSeries);

router.route('/series/:series_id')
    .get(seriesController.getSeries)
    .put(seriesController.updateSeries)
    .delete(seriesController.deleteSeries);

module.exports = router;
