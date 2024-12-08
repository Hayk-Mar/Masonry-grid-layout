import { EmptyState } from "components/empty-state";
import { Loading } from "components/loading";
import { VirtualizedMasonryGrid } from "components/masonry-grid-layout";
import { Search } from "components/search";
import { throttle } from "helpers/throttle";
import { useImageFetch } from "hooks/use-image-fetch";
import { useObserveElement } from "hooks/use-observe-element";
import { useCallback, useRef } from "react";

export const Home = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchValue = useRef<string>("");

  const { items, isLoading, hasMore, fetchImages } = useImageFetch({
    searchValue: searchValue,
  });

  const throttledFetchResults = useCallback(throttle(fetchImages, 500), [fetchImages]);

  const onChangeSearchValue = (value: string) => {
    searchValue.current = value;
    throttledFetchResults(true);
  };

  useObserveElement({
    observableElementRef: loadMoreRef,
    startObserving: hasMore,
    callBack: throttledFetchResults,
  });

  return (
    <main ref={containerRef}>
      <Search onChange={onChangeSearchValue} />
      {!!items.length && <VirtualizedMasonryGrid items={items} />}
      {!items.length && !isLoading && <EmptyState />}
      {hasMore && <Loading ref={loadMoreRef} />}
    </main>
  );
};
