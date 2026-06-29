const _transformations = {
  thumbnail: 'w_300,h_300,c_fill,q_auto',
  card: 'w_400,h_500,c_fill,q_auto',
  gallery: 'w_800,q_auto',
  zoom: 'w_1200,q_auto',
  hero: 'w_1920,h_600,c_fill,q_auto',
  logo: 'w_200,h_200,c_fit,q_auto',
  avatar: 'w_100,h_100,c_fill,q_auto',
} as const;

export type TransformationKey = keyof typeof _transformations;

interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  transformations: typeof _transformations;
  getUrl: (publicId: string, transformation: TransformationKey) => string;
  getRawUrl: (publicId: string) => string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  transformations: _transformations,
  getUrl: (publicId: string, transformation: TransformationKey) => {
    const t = _transformations[transformation];
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${t}/${publicId}`;
  },
  getRawUrl: (publicId: string) => {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`;
  },
};
