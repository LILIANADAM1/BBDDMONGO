//contenidosController js
Contenidos = require('./contenidosModel')


exports.index = function(req,res)
{
    Contenidos.get().then((contenido) =>
    {
        res.json({
            status: "succes",
            message: "Contenidos retrived succesfully",
            data: contenido
        });
        
    }).catch(function(error)
    {
        res.json({
            status: "error",
            message: error
        });
    });
}


exports.new = function (req, res) {
    var contenidos = new Contenidos({
        Titulo: req.body.Titulo,
        TipoContenido: req.body.TipoContenido,
        Descripcion: req.body.Descripcion,
        Valoraciones: req.body.Valoraciones,
        Generos: req.body.Generos,
        NumeroReproducciones: req.body.NumeroReproducciones,
        Premios: req.body.Premios,
        Pelicula: req.body.Pelicula,
        Serie: req.body.Serie
    });

    contenidos.save()
        .then(function(savedContenido) {
            res.status(201).json({
                message: "Nuevo contenido añadido",
                data: savedContenido
            });
        })
        .catch(function(err) {
            let errorMessage = "Error al añadir nuevo contenido";
            if (err.errors) {
                let validationErrors = [];
                for (let key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        validationErrors.push({
                            field: key,
                            message: err.errors[key].message
                        });
                    }
                }
                errorMessage = "Errores de validación: " + JSON.stringify(validationErrors);
            } else {
                console.error("Error al guardar contenido:", err);
            }
            res.status(500).json({
                message: errorMessage,
                error: err
            });
        });
};


exports.view = function(req,res) 
{
    Contenidos.findById(req.params.contenidos_id).then(function(contenidos)
    {
        res.json({
            message: "Contenidos retrieved correctly",
            data:contenidos
        })
    });
}

exports.getAllSeries = function(req, res) {
    Contenidos.find({ TipoContenido: "serie" }).then(function(series) {
        res.json({
            message: "Series retrieved correctly",
            data: series
        });
    }).catch(function(err) {
        res.status(500).json({
            message: "Error retrieving series",
            error: err
        });
    });
};

exports.getAllPeliculas = function(req, res) {
    Contenidos.find({ TipoContenido: "película" }).then(function(peliculas) {
        res.json({
            message: "Peliculas retrieved correctly",
            data: peliculas
        });
    }).catch(function(err) {
        res.status(500).json({
            message: "Error retrieving Pelicula",
            error: err
        });
    });
};

exports.getContenidosByGenero = function(req, res) {
    var genero = req.params.genero;
    Contenidos.find({ 
        TipoContenido: { $in: ["serie", "pelicula"] },
        Generos: genero 
    }).then(function(contenidos) {
        res.json({
            message: `Contenidos de género ${genero} retrieved correctly`,
            data: contenidos
        });
    }).catch(function(err) {
        res.status(500).json({
            message: "Error retrieving contenidos",
            error: err
        });
    });
};

exports.getContenidosTop10 = function(req, res) {
    Contenidos.aggregate([
        { $match: { TipoContenido: { $in: ["serie", "pelicula"] } } },
        { $unwind: "$Valoraciones" },
        {
            $group: {
                _id: { Nombre: "$Titulo", Tipo: "$TipoContenido" },
                MediaPuntuacion: { $avg: "$Valoraciones.Puntuacion" }
            }
        },
        { $sort: { MediaPuntuacion: -1 } },
        { $limit: 10 }
    ]).then(function(resultados) {
        res.json({
            message: "Top 10 contenidos por media de valoraciones retrieved correctly",
            data: resultados
        });
    }).catch(function(err) {
        res.status(500).json({
            message: "Error retrieving contenidos",
            error: err
        });
    });
};



exports.delete = function(req,res)
{
    Contenidos.deleteOne({_id:req.params.contenidos_id}).then(function(contenidos)
    {
        res.json({
            status: "Contenidos deleted succesfully",
            data: contenidos
        })
    });
}


exports.update = function (req, res) {
    Contenidos.findById(req.params.contenidos_id).then(function (contenidos) {
        if (!contenidos) {
            return res.status(404).json({
                message: "Contenido not found"
            });
        }

        contenidos.Titulo = req.body.Titulo || contenidos.Titulo;
        contenidos.TipoContenido = req.body.TipoContenido || contenidos.TipoContenido;
        contenidos.Descripcion = req.body.Descripcion || contenidos.Descripcion;
        contenidos.Valoraciones = req.body.Valoraciones || contenidos.Valoraciones;
        contenidos.Generos = req.body.Generos || contenidos.Generos;
        contenidos.NumeroReproducciones = req.body.NumeroReproducciones || contenidos.NumeroReproducciones;
        contenidos.Premios = req.body.Premios || contenidos.Premios;
        contenidos.Pelicula = req.body.Pelicula || contenidos.Pelicula;
        contenidos.Serie = req.body.Serie || contenidos.Serie;

        contenidos.save().then(function (updatedContenido) {
            res.json({
                message: "Contenido updated",
                data: updatedContenido
            });
        }).catch(function (err) {
            res.status(500).json({
                message: "Error updating contenido",
                error: err
            });
        });
    }).catch(function (err) {
        res.status(500).json({
            message: "Error finding contenido",
            error: err
        });
    });
};