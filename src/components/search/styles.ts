import styled from "styled-components";

export const StyledSearch = styled.div`
  max-width: 100%;
  width: 500px;
  padding: 16px 0;
  margin: auto;
  position: relative;

  input {
    width: 100%;
    padding: 15px 20px;
    color: #060e1e;
    font-size: 16px;
    border-radius: 25px;
    border: none;
    background-color: #f1f1f1;
  }

  .close-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    cursor: pointer;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
