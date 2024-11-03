import { Router } from 'express';
import { imageController } from '../controllers/imageController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const imageRouter = Router();

imageRouter.get(
  '/images/:id',
  asyncHandler(imageController.getImage)
);