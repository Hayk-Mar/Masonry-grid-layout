import { ImageProviders } from "types/images.types";

export const isProviderExists = (provider: ImageProviders) => {
  return [ImageProviders.Pexels, ImageProviders.Unsplash].includes(provider);
};
