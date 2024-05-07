var contenidoSchema = mongoose.Schema({
  Titulo: {
      type: String,
      required: true
  },
  TipoContenido: {
      type: String,
      required: true
  },
  Descripcion: String,
  Valoraciones: [valoracionesSchema],
  Generos: [String],
  NumeroReproducciones: Number,
  Premios: [String],
  Pelicula: {
      Duracion: String,
      Director: String
  },
  Serie: {
      Temporadas: [{
          Numero: Number,
          Capitulos: [capituloSchema]
      }]
  }
}, { collection: 'Contenidos' });


var Contenidos = module.exports = mongoose.model('Contenidos', contenidoSchema);

module.exports.get = function(callback, limit)
{
    return Contenidos.find().exec();
}
