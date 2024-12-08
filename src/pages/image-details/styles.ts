import styled from "styled-components";

export const StyledImageDetails = styled.main`
  max-width: 900px;
  width: 100%;
  padding: 16px;
  margin: auto;
  text-align: center;

  img {
    width: 100%;
    max-height: 400px;
    height: auto;
    object-fit: cover;
    border-radius: 15px;
    background-color: black;
  }

  .create-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: fantasy;
    padding: 10px 0;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
