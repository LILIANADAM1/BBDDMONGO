// Importar Mongoose y el modelo correspondiente
const mongoose = require('mongoose');
const Movie = require('./movieModel'); // Importa tu modelo de película
// const Series = require('./seriesModel'); // Importa tu modelo de serie si es necesario

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/NetAlmix', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');

        // Ejemplo de datos a insertar (puedes adaptarlos a tu modelo)
        const moviesToInsert = [
            {
                title: 'Titanic',
                description: 'A romantic disaster film',
                genres: ['Drama', 'Romance'],
                duration: 195,
                director: 'James Cameron'
            },
            {
                title: 'Inception',
                description: 'A science fiction action film',
                genres: ['Science Fiction', 'Action'],
                duration: 148,
                director: 'Christopher Nolan'
            },
            {
                title: 'The Matrix',
                description: 'A cyberpunk action film',
                genres: ['Science Fiction', 'Action'],
                duration: 136,
                director: 'Lana Wachowski, Lilly Wachowski'
            }
        ];

        // Insertar las películas en la base de datos
        Movie.insertMany(moviesToInsert)
            .then(movies => {
                console.log('Películas insertadas correctamente:');
                console.log(movies);
                mongoose.connection.close(); // Cerrar la conexión después de insertar
            })
            .catch(err => console.error('Error al insertar películas:', err));
    })
    .catch(err => console.error('MongoDB connection error:', err));
