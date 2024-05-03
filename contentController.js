const Content = require('./contentModel');

// Obtener todas las películas
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Content.find({ contentType: 'pelicula' });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las series
exports.getAllSeries = async (req, res) => {
    try {
        const series = await Content.find({ contentType: 'serie' });
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener películas/series por género
exports.getByGenre = async (req, res) => {
    const genre = req.params.genre;
    try {
        const contents = await Content.find({ genres: genre });
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener el top 10 de películas/series por puntuación media
exports.getTop10ByRating = async (req, res) => {
    const contentType = req.params.contentType;
    try {
        const topContents = await Content.aggregate([
            { $match: { contentType } },
            { $unwind: '$ratings' },
            {
                $group: {
                    _id: '$_id',
                    averageRating: { $avg: '$ratings.score' }
                }
            },
            { $sort: { averageRating: -1 } },
            { $limit: 10 }
        ]);
        res.json(topContents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
