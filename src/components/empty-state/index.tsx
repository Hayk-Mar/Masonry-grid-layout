import { FC } from "react";
import { SadIcon } from "components/icons/sad-icon";
import { StyledEmptyState } from "./styles";

type Props = {
  description?: string;
};

export const EmptyState: FC<Props> = ({ description }) => (
  <StyledEmptyState>
    <p>{description || "There is nothing to show..."}</p>
    <SadIcon />
  </StyledEmptyState>
);
