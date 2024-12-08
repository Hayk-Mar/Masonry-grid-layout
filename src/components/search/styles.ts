import styled from "styled-components";

export const StyledSearch = styled.div`
  max-width: 100%;
  width: 500px;
  padding: 16px;
  margin: auto;
  position: relative;

  input {
    width: 100%;
    padding: 15px 20px;
    padding-right: 50px;
    color: #060e1e;
    font-size: 16px;
    border-radius: 25px;
    border: none;
    background-color: #f1f1f1;
  }

  .close-btn {
    position: absolute;
    right: 26px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
