import { useRef, FC } from "react";
import { ImageMappedDataType } from "types/images.types";
import { StyledItem, StyledItemsWrapper, StyledMasonryGridLayout } from "./styles";
import { Link } from "react-router-dom";
import { useMasonryGridCalc } from "hooks/use-masonry-grid-calc";

type Props = {
  items: ImageMappedDataType[];
};

export const VirtualizedMasonryGrid: FC<Props> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { visibleItems, containerHeight } = useMasonryGridCalc(items, containerRef);

  return (
    <StyledMasonryGridLayout>
      <StyledItemsWrapper $height={containerHeight} ref={containerRef}>
        {visibleItems.map(({ id, provider, width, height, translateX, translateY, alt, url }) => (
          <StyledItem
            key={id}
            $width={width}
            $height={height}
            $translateX={translateX}
            $translateY={translateY}
          >
            <Link to={`/image/${provider}/${id}`}>
              <img src={url} alt={alt} width={width} height={height} loading="lazy" />
            </Link>
          </StyledItem>
        ))}
      </StyledItemsWrapper>
    </StyledMasonryGridLayout>
  );
};
