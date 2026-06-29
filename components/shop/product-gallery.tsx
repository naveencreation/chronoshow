'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { cloudinaryConfig } from '@/config/cloudinary';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: Product['product_images'];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images?.[selectedIndex];

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        No Image Available
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        {selected && (
          <Image
            src={cloudinaryConfig.getUrl(selected.public_id, 'gallery')}
            alt={selected.alt_text || productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2',
                index === selectedIndex ? 'border-primary' : 'border-transparent'
              )}
            >
              <Image
                src={cloudinaryConfig.getUrl(image.public_id, 'thumbnail')}
                alt={image.alt_text || `${productName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
