import {
  ImageMappedDataType,
  PexelsImagesResponsePhotos,
  ImageProviders,
  UnsplashImagesResponseResults,
  PexelsImageDetailsResponse,
  UnsplashImageDetailsResponse,
  ImageDetailsType,
} from "types/images.types";

export const imagesMapper = (
  result: PexelsImagesResponsePhotos[] | UnsplashImagesResponseResults[],
  provider: ImageProviders
): ImageMappedDataType[] => {
  switch (provider) {
    case ImageProviders.Pexels: {
      return (result as PexelsImagesResponsePhotos[]).reduce<ImageMappedDataType[]>(
        (acc, { id, alt, width, height, src }) => {
          return acc.concat({ id, alt, width, height, url: src.medium, provider });
        },
        []
      );
    }
    default: {
      return (result as UnsplashImagesResponseResults[]).reduce<ImageMappedDataType[]>(
        (acc, { id, alt_description, width, height, urls }) => {
          return acc.concat({ id, alt: alt_description, width, height, url: urls.small, provider });
        },
        []
      );
    }
  }
};

export const imageDetailsMapper = (
  result: PexelsImageDetailsResponse | UnsplashImageDetailsResponse,
  provider: ImageProviders
): ImageDetailsType => {
  switch (provider) {
    case ImageProviders.Pexels: {
      const pexelsResult = result as PexelsImageDetailsResponse;
      return {
        id: pexelsResult.id,
        width: pexelsResult.width,
        height: pexelsResult.height,
        description: pexelsResult.alt,
        alt: pexelsResult.alt,
        userName: pexelsResult.photographer,
        url: pexelsResult.src.large,
      };
    }
    default: {
      const unsplashResult = result as UnsplashImageDetailsResponse;
      return {
        id: unsplashResult.id,
        created_at: unsplashResult.created_at,
        width: unsplashResult.width,
        height: unsplashResult.height,
        description: unsplashResult.description,
        alt: unsplashResult.alt_description,
        userName: unsplashResult.user.name,
        url: unsplashResult.urls.regular,
      };
    }
  }
};
