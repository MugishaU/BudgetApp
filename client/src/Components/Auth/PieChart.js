import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

export default function PieChart(props) {
  const { breakdown } = props;
  const [chartData, setChartData] = useState(null);
  const colours = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#469B25",
    "#807982",
    "#27447D",
    "#8C71D8",
    "#BD5146",
    "#557C24",
    "#D6D7D3",
    "#EE0997",
    "#532742",
    "#277D6F",
    "#C4677C",
    "#34C00D",
  ];
  useEffect(() => {
    if (breakdown) {
      const data = Object.values(breakdown);
      const labels = Object.keys(breakdown);
      setChartData({ data, labels });
    }
  }, [breakdown]);
  if (chartData) {
    return (
      <div>
        <h3>Spending Breakdown</h3>
        <Doughnut
          data={{
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.data,
                backgroundColor: colours,
                hoverBackgroundColor: colours,
              },
            ],
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}