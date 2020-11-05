import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

export default function PieChart(props) {
  const { breakdown } = props;
  const [chartData, setChartData] = useState(null);
  const colours = [
    "#d11141",
    "#011f4b",
    "#f37735",
    "#00b159",
    "#ffc425",
    "#00aedb",
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
        <h3 className="text-center graduate">SPENDING BREAKDOWN</h3>
        <Doughnut
          options={{
            legend: {
              position: "right",
              labels: { fontSize: 20, fontFamily: "Graduate" },
            },
          }}
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
