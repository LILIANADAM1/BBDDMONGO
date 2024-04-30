// Filename: api-routes.js


//Initialize router
let router = require('express').Router();


//Set default API response
router.get('/', function(req, res)
{
    res.json({
        status: 'Api trabajando',
        message: 'Bienvenid@s al mejor WS del mundo'
    });
});


var Controller = require('./Controller')
router.route('/peliculas')
    .get(Controller.index)
    .post(Controller.new)


router.route('/games/findbyid/:game_id')
    .get(Controller.view)
    .delete(Controller.delete)
    .put(Controller.update)


module.exports = router;
