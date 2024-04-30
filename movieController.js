const Movie = require('./movieModel');

// Obtener todas las películas
exports.getAllMovies = (req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Crear una nueva película
exports.createMovie = (req, res) => {
    const newMovie = new Movie(req.body);
    newMovie.save()
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Obtener una película por ID
exports.getMovie = (req, res) => {
    Movie.findById(req.params.movie_id)
        .then(movie => {
            if (!movie) {
                return res.status(404).json('Película no encontrada');
            }
            res.json(movie);
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

// Actualizar una película por ID
exports.updateMovie = (req, res) => {
    Movie.findById(req.params.movie_id)
        .then(movie => {
            if (!movie) {
                return res.status(404).json('Película no encontrada');
            }
            // Actualizar campos de la película según los datos recibidos en el cuerpo de la solicitud
            movie.title = req.body.title || movie.title;
            movie.description = req.body.description || movie.description;
            movie.genres = req.body.genres || movie.genres;
            movie.numViews = req.body.numViews || movie.numViews;
            movie.awards = req.body.awards || movie.awards;
            movie.duration = req.body.duration || movie.duration;
            movie.director = req.body.director || movie.director;

            // Guardar la película actualizada en la base de datos
            movie.save()
                .then(updatedMovie => res.json(updatedMovie))
                .catch(err => res.status(400).json('Error al actualizar la película: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

// Eliminar una película por ID
exports.deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params.movie_id)
        .then(movie => {
            if (!movie) {
                return res.status(404).json('Película no encontrada');
            }
            res.json('Película eliminada correctamente');
        })
        .catch(err => res.status(400).json('Error al eliminar la película: ' + err));
};
