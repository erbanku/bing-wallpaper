'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox, { LightboxImage } from './ImageLightbox';

interface WallpaperGridProps {
  wallpapers: LightboxImage[];
}

export default function WallpaperGrid({ wallpapers }: WallpaperGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpapers.map((wallpaper, index) => (
          <div
            key={wallpaper.date}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-video">
              <Image
                src={wallpaper.url.includes('?') 
                  ? `${wallpaper.url}&pid=hp&w=384&h=216&rs=1&c=4`
                  : `${wallpaper.url}?pid=hp&w=384&h=216&rs=1&c=4`}
                alt={wallpaper.copyright}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-slate-800/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-sm font-medium mb-1">{wallpaper.date}</p>
                <p className="text-xs line-clamp-2">{wallpaper.copyright}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(wallpaper.url, '_blank');
                  }}
                  className="inline-block mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded backdrop-blur-sm transition-colors"
                >
                  Download 4K
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={wallpapers}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
