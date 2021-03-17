import React, { useRef, useState } from "react";
import { Layout, CommonBtn } from "../StyledComponents/Layout";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ClipWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 280px;
  & input {
    font-size: 16px;
    padding: 8px 12px;
  }

  button {
    width: 100px;
    font-size: 13px;
    font-weight: 600;
  }
`;

function useQuery() {
  let result = new URLSearchParams(useLocation().search).get("q");

  if (result == null) {
    return "";
  }

  return result;
}

function Clipboard(props) {
  let inputElementRef = useRef(null);
  let query = useQuery();
  const [inputElement, setInputElement] = useState(query);

  console.log("hello ===>", query);

  const handleChange = (event) => {
    setInputElement(event.target.value);
  };

  const copyCodeToClipboard = () => {
    const el = inputElementRef;
    inputElementRef.select();
    document.execCommand("copy");
  };

  return (
    <Layout>
      <ClipWrapper>
        <input
          ref={(input) => (inputElementRef = input)}
          value={inputElement}
          onChange={handleChange}
          placeholder="Enter text to copy"
        />
        <CommonBtn onClick={() => copyCodeToClipboard()}>Copy</CommonBtn>
      </ClipWrapper>
    </Layout>
  );
}

export default Clipboard;
