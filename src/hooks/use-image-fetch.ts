import { imagesMapper } from "helpers/image-mapper";
import { RefObject, useCallback, useRef, useState } from "react";
import { getImagesFromPexels, getImagesFromUnsplash } from "services/requests";
import { ImageProviders, ImageMappedDataType } from "types/images.types";

type Props = {
  searchValue: RefObject<string>;
};

export const useImageFetch = ({ searchValue }: Props) => {
  const [items, setItems] = useState<ImageMappedDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page = useRef<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchImages = useCallback(async (reset?: boolean) => {
    setIsLoading(true);
    if (reset) {
      page.current = 1;
    }

    let mappedImages: ImageMappedDataType[] = [];
    let total = 0;

    try {
      if (searchValue.current) {
        const result = await getImagesFromUnsplash({
          search: searchValue.current,
          page: page.current++,
        });

        mappedImages = imagesMapper(result.results, ImageProviders.Unsplash);
        total = result.total;
      } else {
        const result = await getImagesFromPexels({
          search: "Ocean",
          page: page.current++,
        });

        mappedImages = imagesMapper(result.photos, ImageProviders.Pexels);
        total = result.total_results;
      }
    } catch (err) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }

    setItems((items: ImageMappedDataType[]) => {
      if (items.length >= total || !mappedImages.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      return reset ? mappedImages : items.concat(mappedImages);
    });
  }, []);

  return { isLoading, items, hasMore, fetchImages };
};
