import { GRID_LAYOUT_GAP } from "constants/shared.constants";
import { styled } from "styled-components";

export const StyledMasonryGridLayout = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: ${GRID_LAYOUT_GAP}px;
`;

export const StyledItemsWrapper = styled.div<{ $height: number }>`
  position: relative;
  height: ${({ $height }) => $height}px;
`;

export const StyledItem = styled.div<{
  $width: number;
  $height: number;
  $translateX: number;
  $translateY: number;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  transform: ${({ $translateX, $translateY }) => `translate(${$translateX}px, ${$translateY}px)`};
  overflow: hidden;
  border-radius: 5px;

  @media (hover: hover) {
    transition: transform ease-out 0.2s, box-shadow ease-out 0.2s;

    &:hover {
      transform: ${({ $translateX, $translateY }) =>
        `translate(${$translateX}px, ${$translateY}px) scale(1.02)`};
      cursor: pointer;
      box-shadow: 0 0 10px #9f9f9f;
    }
  }

  a {
    display: inline-block;

    img {
      object-fit: cover;
    }
  }
`;
