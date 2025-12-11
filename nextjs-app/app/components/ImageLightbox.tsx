'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export interface LightboxImage {
  url: string;
  copyright: string;
  date: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentImage = images[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  }, [images.length]);

  const handleDownload = async () => {
    try {
      // Validate URL is from expected image host
      const url = new URL(currentImage.url);
      if (!url.hostname.endsWith('bing.com')) {
        console.error('Invalid image URL domain');
        return;
      }
      
      // Extract file extension from URL
      const pathname = url.pathname;
      const extension = pathname.substring(pathname.lastIndexOf('.')) || '.jpg';
      
      // Create filename with date
      const filename = `${currentImage.date}${extension}`;
      
      // Fetch the image
      const response = await fetch(currentImage.url);
      if (!response.ok) {
        throw new Error('Download failed');
      }
      const blob = await response.blob();
      
      // Create download link
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
      // User-friendly error message instead of opening in new tab
      alert('Failed to download image. Please try again.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, goToPrevious, goToNext]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        aria-label="Close lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Left arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="absolute left-4 z-50 text-white/80 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-4 z-50 text-white/80 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Main content */}
      <div 
        className="flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative w-full flex-1 flex items-center justify-center mb-6">
          <div className="relative w-full h-full max-h-[80vh]">
            <Image
              src={currentImage.url}
              alt={currentImage.copyright}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Image information */}
        <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-sm rounded-lg p-6 text-white text-center">
          <p className="text-lg font-semibold mb-2">{currentImage.date}</p>
          <p className="text-sm mb-4 opacity-90">{currentImage.copyright}</p>
          
          {/* Download button */}
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download 4K Image
            </button>
          </div>

          {/* Image counter */}
          <p className="text-sm mt-4 opacity-75">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
