//aqui van todas las rutas porisbles, en vez de enborronar el index. 

//FIlename: api-router.js

//Initialize router
let router = require ('express').Router();

//Set default API response
router.get('/', function(req,res)
{
    res.json({
        status: 'Api trabajando',
        message: 'Bienvemid@s al mejor WS del mundo'
    });
});

var contenidosController = require('./contenidosController')
router.route('/contenidos')
    .get(contenidosController.index)//127.0.0.1:8080/api/contenidos/
    .post(contenidosController.new)//127.0.0.1:8080/api/contenidos/

router.route('/contenidos/findbyid/:contenidos_id')
    .get(contenidosController.view)//127.0.1:8080/api/contenidos/findbyid/661fbaa383efb6caaf80e69b
    .delete(contenidosController.delete)//127.0.1:8080/api/contenidos/findbyid/661520292eef8cfa6bf6ee5a
    .put(contenidosController.update)//127.0.0.1:8080/api/contenidos/findbyid/6633438db700538afa2202da
    //aqui igual el fin de las series.

//Rutas adicionales para filtrar contenidos
// Rutas para la entidad "Series"
router.route('/series')
    .get(contenidosController.getAllSeries); //127.0.1:8080/api/series
// Rutas para la entidad "Peliculas"
router.route('/peliculas')
    .get(contenidosController.getAllPeliculas); // Obtener todas las películas
router.get('/genero/:genero', contenidosController.getContenidosByGenero);//127.0.0.1:8080/api/genero/crimen o cualquiera de los generos que este dentro del array generos. 
router.get('/top10', contenidosController.getContenidosTop10);//127.0.0.1:8080/api/top10

//esto es para que se guarden entre rutas
module.exports = router;