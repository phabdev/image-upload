import React from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Image } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Image className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Secure Image Sharing
          </h1>
          <p className="text-lg text-gray-600">
            Upload and share images with temporary links
          </p>
        </div>

        <ImageUploader />
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Links expire after 24 hours for your privacy and security</p>
        </footer>
      </div>
    </div>
  );
}

export default App;