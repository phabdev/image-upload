import { nanoid } from 'nanoid';
import { ImageService } from '../services/imageService.js';

export const uploadController = {
  uploadImage: async (req, res) => {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const imageId = nanoid(10);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await ImageService.saveImageMetadata({
      id: imageId,
      filename: req.file.filename,
      expiresAt,
    });

    const shareLink = `${process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`}/api/images/${imageId}`;

    res.json({
      success: true,
      shareLink,
      expiresAt,
    });
  },
};