import { forwardRef } from "react";
import { LoadingIcon } from "components/icons/loading-icon";
import { StyledLoading } from "./styles";

export const Loading = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <StyledLoading ref={ref}>
      <LoadingIcon />
    </StyledLoading>
  );
});
