import React, { useState, useCallback } from 'react';
import { Upload, X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadImage } from '../services/api';

export const ImageUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await handleUpload(files[0]);
    }
  }, []);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsUploading(true);
    setShareLink(null);

    try {
      const response = await uploadImage(file);
      setShareLink(response.shareLink);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = useCallback(() => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    }
  }, [shareLink]);

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload
            className={`mx-auto h-12 w-12 ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {isUploading ? 'Uploading...' : 'Drop your image here'}
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

          {!isUploading && (
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Select a file
                </span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          )}

          {isUploading && (
            <div className="mt-4">
              <div className="animate-pulse flex justify-center">
                <div className="h-2 w-24 bg-blue-200 rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {shareLink && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-700 truncate">{shareLink}</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm text-green-700 hover:bg-green-100 rounded"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-xs text-green-600">
            This link will expire in 24 hours
          </p>
        </div>
      )}
    </div>
  );
};