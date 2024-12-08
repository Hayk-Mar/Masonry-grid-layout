import { FC, useState } from "react";
import { StyledSearch } from "./styles";
import { CloseIcon } from "components/icons/close-icon";

type Props = {
  onChange: (value: string) => void;
};

export const Search: FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");

  const onInputChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <StyledSearch>
      <input
        type="text"
        placeholder="Search Images ..."
        value={value}
        onChange={(event) => onInputChange(event.target.value)}
      />
      <button className="close-btn" type="button" onClick={() => onInputChange("")}>
        <CloseIcon />
      </button>
    </StyledSearch>
  );
};
