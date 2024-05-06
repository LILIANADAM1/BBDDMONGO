const Content = require('./content');

const contentController = {
  createContent: async (req, res) => {
    try {
      const newContent = new Content(req.body);
      await newContent.save();
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteContent: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContent = await Content.findByIdAndDelete(id);
      if (!deletedContent) {
        return res.status(404).json({ message: 'Contenido no encontrado' });
      }
      res.json(deletedContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateContent: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedContent = await Content.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedContent) {
        return res.status(404).json({ message: 'Contenido no encontrado' });
      }
      res.json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllSeries: async (req, res) => {
    try {
      const series = await Content.find({ contentType: 'serie' });
      res.json(series);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllMovies: async (req, res) => {
    try {
      const movies = await Content.find({ contentType: 'movie' });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getContentByGenre: async (req, res) => {
    try {
      const { genre } = req.params;
      const contentByGenre = await Content.find({ genres: genre });
      res.json(contentByGenre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTop10ByRating: async (req, res) => {
    try {
      const { type } = req.params;
      const top10 = await Content.find({ contentType: type })
                                .sort({ 'ratings.score': -1 })
                                .limit(10);
      res.json(top10);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = contentController;
