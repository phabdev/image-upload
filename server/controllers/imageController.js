import { ImageService } from '../services/imageService.js';

export const imageController = {
  getImage: async (req, res) => {
    const { id } = req.params;
    const image = await ImageService.getImage(id);

    if (!image) {
      res.status(404).json({ error: 'Image not found or expired' });
      return;
    }

    res.redirect(`/uploads/${image.filename}`);
  },
};