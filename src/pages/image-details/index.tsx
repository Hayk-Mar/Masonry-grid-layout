import { Loading } from "components/loading";
import { isProviderExists } from "helpers/shared";
import { useImageDetailsFetch } from "hooks/use-image-details-fetch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageProviders } from "types/images.types";
import { StyledImageDetails } from "./styles";
import { getFormattedDate } from "helpers/get-formatted-date";
import { BackButton } from "components/back-button";
import { EmptyState } from "components/empty-state";

export const ImageDetails = () => {
  const { id, provider } = useParams();
  const { details, isLoading, fetchDetails } = useImageDetailsFetch({
    id,
    provider: provider as ImageProviders,
  });
  const providerExists = isProviderExists((provider as ImageProviders) || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!providerExists) navigate("/");
  }, [provider]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (!details && isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <StyledImageDetails>
      {details ? (
        <>
          <img
            src={details.url}
            alt={details.alt}
            width={details.width > 900 ? 900 : details.width}
            height={details.height > 500 ? 500 : details.height}
          />
          <div className="create-info">
            <span>By "{details.userName}"</span>
            {details.created_at && <span>Created at {getFormattedDate(details?.created_at)}</span>}
          </div>
          <p>{details.description}</p>
        </>
      ) : (
        <EmptyState description="We can't find Image details" />
      )}
      <BackButton link="/">Go Back</BackButton>
    </StyledImageDetails>
  );
};
