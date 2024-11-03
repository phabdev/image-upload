import { join } from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const METADATA_FILE = join(__dirname, '../../data/metadata.json');
const UPLOAD_DIR = join(__dirname, '../../uploads');

export const ImageService = {
  async saveImageMetadata(metadata) {
    await fs.mkdir(dirname(METADATA_FILE), { recursive: true });
    
    let existingData = [];
    try {
      const data = await fs.readFile(METADATA_FILE, 'utf8');
      existingData = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, that's ok
    }

    existingData.push(metadata);
    await fs.writeFile(METADATA_FILE, JSON.stringify(existingData, null, 2));
  },

  async getImage(id) {
    try {
      const data = await fs.readFile(METADATA_FILE, 'utf8');
      const metadata = JSON.parse(data);
      const image = metadata.find(img => img.id === id);

      if (!image || new Date(image.expiresAt) < new Date()) {
        return null;
      }

      return image;
    } catch (error) {
      return null;
    }
  },

  async cleanup() {
    try {
      const data = await fs.readFile(METADATA_FILE, 'utf8');
      const metadata = JSON.parse(data);
      const now = new Date();

      const [expired, valid] = metadata.reduce(
        ([exp, val], img) => {
          if (new Date(img.expiresAt) < now) {
            exp.push(img);
          } else {
            val.push(img);
          }
          return [exp, val];
        },
        [[], []]
      );

      // Remove expired files
      await Promise.all(
        expired.map(img =>
          fs.unlink(join(UPLOAD_DIR, img.filename)).catch(() => {})
        )
      );

      // Update metadata file
      await fs.writeFile(METADATA_FILE, JSON.stringify(valid, null, 2));
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  },
};