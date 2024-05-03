const mongoose = require('mongoose');

const documentalSchema = new mongoose.Schema({
    duracion: String,
    director: String,
    experto: [{
        nombre: String,
        apellido: String,
        cargo: String
    }]
});

const Documental = mongoose.model('Documental', documentalSchema);

module.exports = Documental;
