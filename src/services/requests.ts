import { getJSON } from "./http-service";
import {
  PexelsImageDetailsUrl,
  PexelsImagesSearchUrl,
  UnsplashImageDetailsUrl,
  UnsplashImagesSearchUrl,
} from "./configs";
import {
  ImagesRequest,
  PexelsImagesResponse,
  UnsplashImagesResponse,
  UnsplashImageDetailsResponse,
  PexelsImageDetailsResponse,
} from "types/images.types";

export const getImagesFromPexels = ({ search, page = 1, perPage = 100 }: ImagesRequest) => {
  return getJSON<PexelsImagesResponse>(PexelsImagesSearchUrl, {
    params: { query: search, page, per_page: perPage },
    headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
  });
};

export const getImagesFromUnsplash = ({ search, page = 1, perPage = 30 }: ImagesRequest) => {
  return getJSON<UnsplashImagesResponse>(UnsplashImagesSearchUrl, {
    params: { query: search, page, per_page: perPage },
    headers: { Authorization: import.meta.env.VITE_UNSPLASH_API_KEY },
  });
};

export const getImageDetailsFromPexels = (id: string) => {
  return getJSON<PexelsImageDetailsResponse>(PexelsImageDetailsUrl(id), {
    headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
  });
};

export const getImageDetailsFromUnsplash = (id: string) => {
  return getJSON<UnsplashImageDetailsResponse>(UnsplashImageDetailsUrl(id), {
    headers: { Authorization: import.meta.env.VITE_UNSPLASH_API_KEY },
  });
};
