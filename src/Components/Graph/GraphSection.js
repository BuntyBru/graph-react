import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import styled from "styled-components";
import { device } from "../../StyledComponents/Device";

const GraphParent = styled.div`
  width: 100%;
  height: 100%;

  @media ${device.mobileL} {
    width: 1000px;
  }
`;

const chartConfig = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Count",
        data: [],
        backgroundColor: ["rgba(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

function GraphSection({ graphData }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newChartInstance = new Chartjs(chartRef.current, chartConfig);
    setChartInstance(newChartInstance);
  }, []);

  useEffect(() => {
    if (graphData.items) {
      let labels = graphData.items.map((x) => x.name);
      let data = graphData.items.map((x) => x.count);
      updateDataset(labels, data);
    }
  }, [graphData]);

  const updateDataset = (labels, data) => {
    chartInstance.data.datasets[0].data = data;
    chartInstance.data.labels = labels;

    chartInstance.data.datasets[0].backgroundColor = Array.from(
      { length: labels.length },
      () => "rgba(255, 99, 132)"
    );

    chartInstance.update();
  };

  return (
    <GraphParent>
      <canvas id="myChart" ref={chartRef} />
    </GraphParent>
  );
}

export default GraphSection;
