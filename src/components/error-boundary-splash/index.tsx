import { SadIcon } from "components/icons/sad-icon";
import { StyledErrorBoundarySplash } from "./styles";
import { useNavigate } from "react-router-dom";
import { RefreshIcon } from "components/icons/refresh-icons";

export const ErrorBoundarySplash = () => {
  const navigate = useNavigate();

  return (
    <StyledErrorBoundarySplash>
      <div className="error-info">
        <div className="sad-icon">
          <p>Oh, what happened,</p>
          <SadIcon />
        </div>
        <p>Please reload the page, I can't see this anymore</p>
      </div>
      <button type="button" className="btn" onClick={() => navigate(0)}>
        <RefreshIcon />
        Reload
      </button>
    </StyledErrorBoundarySplash>
  );
};
