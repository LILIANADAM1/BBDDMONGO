const Documental = require('../documental');

const documentalController = {
    getAllDocumentales: async (req, res) => {
        try {
            const documentales = await Documental.find();
            res.json(documentales);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createDocumental: async (req, res) => {
        const { duracion, director, experto } = req.body;

        try {
            const nuevoDocumental = new Documental({
                duracion,
                director,
                elenco
            });

            await nuevoDocumental.save();
            res.status(201).json(nuevoDocumental);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = documentalController;
