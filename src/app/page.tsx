'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    // TODO: Implement breed detection API call
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Dog Health & Behavior Analysis
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Upload a photo of your dog to get an AI-powered analysis of their breed, health, and behavior.
          </p>
        </div>

        <div className="mt-10">
          <ImageUpload onImageSelect={handleImageSelect} />
        </div>

        {selectedImage && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Image selected: {selectedImage.name}
            </p>
            <p className="text-sm text-gray-500">
              Size: {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 