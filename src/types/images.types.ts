export enum ImageProviders {
  Pexels = "Pexels",
  Unsplash = "Unsplash",
}

export type ImagesRequest = {
  search: string;
  page?: number;
  perPage?: number;
};

export type PexelsImagesResponse = {
  page: number;
  per_page: number;
  photos: PexelsImagesResponsePhotos[];
  total_results: number;
};

export type PexelsImagesResponsePhotos = {
  id: string;
  alt: string;
  width: number;
  height: number;
  src: PexelsImagesResponsePhotosSrc;
};

export type PexelsImagesResponsePhotosSrc = {
  medium: string;
  large: string;
};

export type PexelsImageDetailsResponse = {
  id: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  src: PexelsImagesResponsePhotosSrc;
};

export type UnsplashImagesResponse = {
  total: number;
  total_pages: number;
  results: UnsplashImagesResponseResults[];
};

export type UnsplashImagesResponseResults = {
  id: string;
  alt_description: string;
  width: number;
  height: number;
  urls: UnsplashImagesResponseResultUrls;
};

export type UnsplashImagesResponseResultUrls = {
  regular: string;
  small: string;
};

export type UnsplashImagesUser = {
  name: string;
};

export type UnsplashImageDetailsResponse = {
  id: string;
  created_at: Date;
  width: number;
  height: number;
  description: string;
  alt_description: string;
  user: UnsplashImagesUser;
  urls: UnsplashImagesResponseResultUrls;
};

export type ImageDetailsType = {
  id: string;
  created_at?: Date;
  width: number;
  height: number;
  description: string;
  alt: string;
  userName: string;
  url: string;
};

export type ImageMappedDataType = {
  id: string;
  alt: string;
  width: number;
  height: number;
  url: string;
  provider: ImageProviders;
};

export type VirtualizedLayoutDataType = {
  id: string;
  provider: ImageProviders;
  translateY: number;
  translateX: number;
  width: number;
  height: number;
  url: string;
  alt: string;
};
