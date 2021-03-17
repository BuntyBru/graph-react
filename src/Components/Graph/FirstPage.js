import React, { useState, useEffect } from "react";
import { Layout } from "../../StyledComponents/Layout";
import FormSection from "./Forms";
import GraphSection from "./GraphSection";

function FirstPage() {
  const [urlParams, setUrlParams] = useState("");
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    console.log("graphData", urlParams);
    let url =
      "https://api.stackexchange.com/2.2/tags?key=vUFgqWiq2tuN4KmWFwoqLg((&site=stackoverflow&" +
      urlParams;
    const abortController = new AbortController();
    const fetchData = async () => {
      fetch(url, { signal: abortController.signal })
        .then((res) => res.json())
        .then((res) => {
          if (res.error_id) {
            console.log("ERROR", res);
            setGraphData({});
          } else {
            // console.log(res);
            setGraphData(res);
          }
        })
        .catch((e) => {
          if (!abortController.signal.aborted) {
            console.log("Error has happened", e);
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
      <GraphSection graphData={graphData} />
    </Layout>
  );
}

export default FirstPage;
