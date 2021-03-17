import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderParent = styled.div`
  background: #171c23;
  padding: 10px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & button {
    margin-right: 22px;
    background: transparent;
    font-size: 14px;
    color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    outline: none;
  }
`;

function Header() {
  return (
    <HeaderParent>
      <Link to="/">
        <button color="inherit">Home</button>
      </Link>
      <Link to="/clipboard">
        <button color="inherit">Clipboard</button>
      </Link>
    </HeaderParent>
  );
}

export default Header;
