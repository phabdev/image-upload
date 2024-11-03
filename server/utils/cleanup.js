import { ImageService } from '../services/imageService.js';

const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

export const cleanupTask = {
  start() {
    setInterval(() => {
      ImageService.cleanup().catch(console.error);
    }, CLEANUP_INTERVAL);
  },
};