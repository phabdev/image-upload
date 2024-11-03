export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size too large. Maximum size is 10MB',
      });
    }
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: err.message || 'Internal server error',
  });
};