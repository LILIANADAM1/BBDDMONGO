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
    .get(contenidosController.index)
    .post(contenidosController.new)

router.route('/contenidos/findbyid/:contenidos_id')
    .get(contenidosController.view)
    .delete(contenidosController.delete)
    .put(contenidosController.update)


router.route('/series')
    .get(contenidosController.getAllSeries); 

router.route('/peliculas')
    .get(contenidosController.getAllPeliculas); 
router.get('/genero/:genero', contenidosController.getContenidosByGenero);
router.get('/top10', contenidosController.getContenidosTop10);


module.exports = router;