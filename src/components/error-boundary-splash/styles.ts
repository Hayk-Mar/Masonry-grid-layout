import styled from "styled-components";

export const StyledErrorBoundarySplash = styled.div`
  text-align: center;

  .error-info {
    padding: 24px 12px;
    gap: 15px;
    font-family: sans-serif;
    font-size: 18px;
    margin: auto;
    width: 600px;
    max-width: 100%;

    .sad-icon {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    p {
      margin: 0;
    }

    svg {
      width: 40px;
      height: 40px;
    }
  }
`;
