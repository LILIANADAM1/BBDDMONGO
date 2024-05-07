//contenidosController js
Contenidos = require('./contenidosModel')

//Handle index

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

// INSERTS
exports.new = function (req, res) {
    // Crear una nueva instancia de Contenidos con los datos del cuerpo de la solicitud
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

    // Guardar el nuevo contenido en la base de datos
    contenidos.save()
        .then(function(savedContenido) {
            res.status(201).json({
                message: "Nuevo contenido añadido",
                data: savedContenido
            });
        })
        .catch(function(err) {
            // Manejar errores de validación o de base de datos
            let errorMessage = "Error al añadir nuevo contenido";
            if (err.errors) {
                // Si hay errores de validación, construir un mensaje de error más específico
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
                // Otro tipo de error de base de datos
                console.error("Error al guardar contenido:", err);
            }
            res.status(500).json({
                message: errorMessage,
                error: err
            });
        });
};


//FIND DE TODO
exports.view = function(req,res) //una find, un get para solo ids, para tener dato de referencia para las consultas en la bbdd 
{
    Contenidos.findById(req.params.contenidos_id).then(function(contenidos)
    {
        res.json({
            message: "Contenidos retrieved correctly",
            data:contenidos
        })
    });
}

//FIND DE TODAS LAS SERIES 
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

//FIND DE TODAS LAS PELICULAS 
exports.getAllPeliculas = function(req, res) {
    //console.log("Hey pavo");
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

//FIND DE PELICULAS Y SERIES POR GENERO 
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

//FIND TOP 10 
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


//DELETE
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

// UPDATES
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