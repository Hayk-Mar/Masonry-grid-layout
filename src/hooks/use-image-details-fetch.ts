import { imageDetailsMapper } from "helpers/image-mapper";
import { useCallback, useState } from "react";
import { getImageDetailsFromPexels, getImageDetailsFromUnsplash } from "services/requests";
import { ImageProviders, ImageDetailsType } from "types/images.types";

type Props = {
  id?: string;
  provider?: ImageProviders;
};

export const useImageDetailsFetch = ({ id, provider }: Props) => {
  const [details, setDetails] = useState<ImageDetailsType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDetails = useCallback(async () => {
    if (!id) return;
    let mappedDetails: ImageDetailsType;

    try {
      if (provider === ImageProviders.Pexels) {
        const result = await getImageDetailsFromPexels(id);
        mappedDetails = imageDetailsMapper(result, ImageProviders.Pexels);
      } else {
        const result = await getImageDetailsFromUnsplash(id);
        mappedDetails = imageDetailsMapper(result, ImageProviders.Unsplash);
      }
    } catch (err) {
      return;
    } finally {
      setIsLoading(false);
    }

    setDetails(mappedDetails);
  }, [id, provider]);

  return { details, isLoading, fetchDetails };
};
