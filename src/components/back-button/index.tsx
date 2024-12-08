import { FC, ReactNode } from "react";
import { BackIcon } from "components/icons/back-icon";
import { useNavigate } from "react-router-dom";

type Props = {
  link?: string;
  children?: ReactNode;
};

export const BackButton: FC<Props> = ({ children, link }) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    link ? navigate(link) : navigate(-1);
  };

  return (
    <button type="button" className="btn" onClick={onGoBack}>
      <BackIcon />
      {children}
    </button>
  );
};
