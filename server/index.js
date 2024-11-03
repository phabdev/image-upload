import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { uploadRouter } from './routes/upload.js';
import { imageRouter } from './routes/image.js';
import { errorHandler } from './middleware/errorHandler.js';
import { cleanupTask } from './utils/cleanup.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Routes
app.use('/api', uploadRouter);
app.use('/api', imageRouter);

// Error handling
app.use(errorHandler);

// Start cleanup task
cleanupTask.start();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});