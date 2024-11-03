import { Router } from 'express';
import { upload } from '../config/multer.js';
import { uploadController } from '../controllers/uploadController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const uploadRouter = Router();

uploadRouter.post(
  '/upload',
  upload.single('image'),
  asyncHandler(uploadController.uploadImage)
);