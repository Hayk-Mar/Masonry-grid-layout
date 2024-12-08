import { GRID_LAYOUT_BUFFER, GRID_LAYOUT_GAP, SCROLL_WAITING_TIME } from "constants/shared.constants";
import { useState, useEffect, useRef, useCallback, MutableRefObject } from "react";
import { ImageMappedDataType, VirtualizedLayoutDataType } from "types/images.types";
import { binarySearch } from "helpers/binary-search";
import { useWindowResize } from "hooks/use-window-resize";
import {
  IMAGE_DEFAULT_HEIGHT,
  IMAGE_MAX_HEIGHT,
  IMAGE_MIN_HEIGHT,
  IMAGE_MIN_WIDTH,
} from "constants/images.constants";
import { throttle } from "helpers/throttle";

export const useMasonryGridCalc = (
  items: ImageMappedDataType[],
  containerRef: MutableRefObject<HTMLDivElement | null>
) => {
  const [positions, setPositions] = useState<VirtualizedLayoutDataType[]>([]);
  const [visibleItems, setVisibleItems] = useState<VirtualizedLayoutDataType[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const columnWidth = useRef<number>();
  const columnHeights = useRef<number[]>([]);
  const itemIdsSet = useRef<Set<string>>(new Set());

  const getPositions = useCallback(
    (reset?: boolean) => {
      if (!containerRef.current) return;

      if (positions.length && items[0]?.id !== positions[0]?.id) {
        reset = true;
      }

      if (reset) {
        itemIdsSet.current = new Set();
      }

      const containerWidth = containerRef.current.offsetWidth!;
      const newPositions: VirtualizedLayoutDataType[] = [];
      const numColumns = Math.floor(containerWidth / IMAGE_MIN_WIDTH);
      const columnWidthNew = (containerWidth - (numColumns - 1) * GRID_LAYOUT_GAP) / numColumns;

      columnWidth.current = columnWidthNew;

      if (reset || !columnHeights.current.length) {
        for (let i = 0; i < numColumns; i++) {
          columnHeights.current[i] = 0;
        }
      }

      items.forEach(({ id, provider, height, alt, url }) => {
        if (itemIdsSet.current.has(id)) return; // there is a bug in this API - sometimes it loads elements with the same ids and we skip already calculated elements
        itemIdsSet.current.add(id);

        let itemHeight = IMAGE_DEFAULT_HEIGHT;
        if (height > IMAGE_MAX_HEIGHT) {
          itemHeight = Math.floor(height / 10);
          if (itemHeight < IMAGE_MIN_HEIGHT || itemHeight > IMAGE_MAX_HEIGHT) {
            itemHeight = IMAGE_DEFAULT_HEIGHT;
          }
        }

        const minHeightColumnIndex = columnHeights.current.indexOf(Math.min(...columnHeights.current));

        const translateY = Math.min(...columnHeights.current);
        const translateX = minHeightColumnIndex * (columnWidthNew + GRID_LAYOUT_GAP);

        newPositions.push({
          id,
          provider,
          alt,
          url,
          translateY,
          translateX,
          width: columnWidthNew,
          height: itemHeight,
        });
        columnHeights.current[minHeightColumnIndex] += itemHeight + GRID_LAYOUT_GAP;
      });

      if (!newPositions.length) return;
      setPositions((oldPositions) => (reset ? newPositions : oldPositions.concat(newPositions)));
      setContainerHeight(Math.max(...columnHeights.current));
    },
    [items]
  );

  const onWindowResize = useCallback(() => getPositions(true), [getPositions]);

  useWindowResize(onWindowResize);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  const handleScroll = useCallback(() => {
    const scrollTop = -containerRef.current!.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    const startY = scrollTop - GRID_LAYOUT_BUFFER * viewportHeight;
    const endY = scrollTop + viewportHeight + GRID_LAYOUT_BUFFER * viewportHeight;

    const [, startIndex] = binarySearch(positions, (pos) => {
      if (pos.translateY < startY) {
        return 1;
      } else if (pos.translateY > startY) {
        return -1;
      } else return 0;
    });

    const [, endIndex] = binarySearch(positions, (pos) => {
      if (pos.translateY < endY) {
        return 1;
      } else if (pos.translateY > endY) {
        return -1;
      } else return 0;
    });

    const newVisibleItems = positions.slice(startIndex, endIndex);
    setVisibleItems(newVisibleItems);
  }, [positions]);

  const throttledHandleScroll = useCallback(
    throttle(() => handleScroll(), SCROLL_WAITING_TIME),
    [positions]
  );

  useEffect(() => {
    if (!positions.length) return;

    window.addEventListener("scroll", throttledHandleScroll);
    throttledHandleScroll();

    return () => {
      window?.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  return {
    visibleItems,
    containerHeight,
  };
};
