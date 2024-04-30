const Series = require('./seriesModel');

// Obtener todas las series
exports.getAllSeries = (req, res) => {
    Series.find()
        .then(series => res.json(series))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Crear una nueva serie
exports.createSeries = (req, res) => {
    const newSeries = new Series(req.body);
    newSeries.save()
        .then(series => res.json(series))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Obtener una serie por ID
exports.getSeries = (req, res) => {
    Series.findById(req.params.series_id)
        .then(series => {
            if (!series) {
                return res.status(404).json('Serie no encontrada');
            }
            res.json(series);
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

// Actualizar una serie por ID
exports.updateSeries = (req, res) => {
    Series.findById(req.params.series_id)
        .then(series => {
            if (!series) {
                return res.status(404).json('Serie no encontrada');
            }
            // Actualizar campos de la serie según los datos recibidos en el cuerpo de la solicitud
            series.title = req.body.title || series.title;
            series.description = req.body.description || series.description;
            series.genres = req.body.genres || series.genres;
            series.numViews = req.body.numViews || series.numViews;
            series.awards = req.body.awards || series.awards;

            // Guardar la serie actualizada en la base de datos
            series.save()
                .then(updatedSeries => res.json(updatedSeries))
                .catch(err => res.status(400).json('Error al actualizar la serie: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

// Eliminar una serie por ID
exports.deleteSeries = (req, res) => {
    Series.findByIdAndDelete(req.params.series_id)
        .then(series => {
            if (!series) {
                return res.status(404).json('Serie no encontrada');
            }
            res.json('Serie eliminada correctamente');
        })
        .catch(err => res.status(400).json('Error al eliminar la serie: ' + err));
};
