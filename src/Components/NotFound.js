import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  padding: 100px;

  & h4 {
    margin: 0px;
  }
`;

function NotFound() {
  return (
    <WrapperDiv>
      <h4>404 Error Page not found</h4>
    </WrapperDiv>
  );
}

export default NotFound;
