const express = require('express');
const router = express.Router();
const documentalController = require('../controllers/documentalController');

// Rutas para los documentales
router.get('/', documentalController.getAllDocumentales);
router.post('/', documentalController.createDocumental);

module.exports = router;
