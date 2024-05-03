const Contenido = require('./modelo');

exports.agregarContenido = function(req, res) {
    const nuevoContenido = new Contenido({
        titulo: req.body.titulo,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        valoraciones: req.body.valoraciones || [],
        generos: req.body.generos || [],
        numero_reproducciones: req.body.numero_reproducciones || 0,
        premios: req.body.premios || [],
        duracion: req.body.duracion,
        director: req.body.director,
        temporadas: req.body.temporadas || []
    });

    nuevoContenido.save()
        .then(() => {
            res.json({
                message: 'Contenido creado',
                data: nuevoContenido
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

exports.verContenido = (req, res) => {
    Contenido.find()
        .then(contenidos => {
            res.json({
                status: "success",
                message: "Contenidos retrieved successfully",
                data: contenidos
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contenidos."
            });
        });
};
