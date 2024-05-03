const Contenido = require('/ContentModel');

const nuevoDocumental = new Contenido({
    titulo: 'Título del Documental',
    tipo: 'documental',
    descripcion: 'Descripción del Documental',
    valoraciones: [],
    generos: ['Documental', 'Historia'],
    duracion: 120,
    director: 'Director del Documental',
    expertos: [
        {
            nombre: 'Arnol ',
            apellido: 'Scharzenegger',
            cargo: 'CargoExperto1'
        },
        {
            nombre: 'Experto2',
            apellido: 'ApellidoExperto2',
            cargo: 'CargoExperto2'
        }
    ]
});

nuevoDocumental.save()
    .then(() => {
        console.log('Documental guardado correctamente');
    })
    .catch((error) => {
        console.error('Error al guardar el documental:', error);
    });

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
