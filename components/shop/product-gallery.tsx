'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { cloudinaryConfig } from '@/config/cloudinary';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { imageReveal, fadeInScale } from '@/lib/animations';

interface ProductGalleryProps {
  images: Product['product_images'];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
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
        <AnimatePresence mode="wait">
          {selected && !imageErrors[selected.id] ? (
            <motion.div
              key={selected.id}
              variants={imageReveal}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={cloudinaryConfig.getUrl(selected.public_id, 'gallery')}
                alt={selected.alt_text || productName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={() => setImageErrors((prev) => ({ ...prev, [selected.id]: true }))}
              />
            </motion.div>
          ) : (
            <motion.div
              key="error"
              variants={fadeInScale}
              initial="initial"
              animate="animate"
              className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground"
            >
              <ImageOff className="h-10 w-10" />
              <span className="text-sm">Image not available</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2',
                index === selectedIndex ? 'border-primary' : 'border-transparent',
                imageErrors[image.id] && 'border-destructive/30'
              )}
            >
              {!imageErrors[image.id] ? (
                <Image
                  src={cloudinaryConfig.getUrl(image.public_id, 'thumbnail')}
                  alt={image.alt_text || `${productName} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={() => setImageErrors((prev) => ({ ...prev, [image.id]: true }))}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <ImageOff className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
