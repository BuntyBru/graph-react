import React, { useState, useEffect } from "react";
import { Layout, ErrorHolder } from "../../StyledComponents/Layout";
import FormSection from "./Forms";
import GraphSection from "./GraphSection";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: auto;
`;

function FirstPage() {
  const [urlParams, setUrlParams] = useState("");
  const [graphData, setGraphData] = useState({});
  const [errorBlock, setErrorBlock] = useState({
    message: "",
    bool: false,
  });

  useEffect(() => {
    let url =
      "https://api.stackexchange.com/2.2/tags?key=vUFgqWiq2tuN4KmWFwoqLg((&site=stackoverflow&" +
      urlParams;
    const abortController = new AbortController();
    const fetchData = async () => {
      setErrorBlock({
        message: "",
        bool: false,
      });
      fetch(url, { signal: abortController.signal })
        .then((res) => res.json())
        .then((res) => {
          if (res.error_id) {
            setErrorBlock({
              message: `ERROR ${res.error_message + ", " + res.error_name}`,
              bool: true,
            });
            setGraphData({});
          } else {
            setGraphData(res);
          }
        })
        .catch((e) => {
          if (!abortController.signal.aborted) {
            setErrorBlock({
              message: e,
              bool: true,
            });
          }
        });
    };
    fetchData();
    return () => {
      //aborting API requests after unmounting of the component
      abortController.abort();
    };
  }, [urlParams]);

  return (
    <Layout>
      <FormSection callback={setUrlParams} />
      {errorBlock.bool ? (
        <ErrorHolder>
          <p>{errorBlock.message}</p>
        </ErrorHolder>
      ) : (
        <></>
      )}
      <Wrapper>
        <GraphSection graphData={graphData} />
      </Wrapper>
    </Layout>
  );
}

export default FirstPage;
