const express = require('express');
const contentController = require('./controlador');

const router = express.Router();

router.get('/api', (_, res) => {
    res.json({
        status: 'API funcionando',
        message: '¡Bienvenido al mejor WS del mundo!'
    });
});

router.post('/agregarContenido', contentController.agregarContenido);
router.get('/verContenido', contentController.verContenido);


module.exports = router;
