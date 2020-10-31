import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (props.history) {
      let today;
      if (props.date) {
        let dateArray = props.date.split("-");

        today = new Date(dateArray[0], dateArray[1], 0);
      } else {
        today = new Date();
      }

      const sortedHistory = props.history.sort((a, b) => a.day - b.day);
      const distinctHistory = [];
      let position = 0;

      for (const item of sortedHistory) {
        if (position === 0) {
          distinctHistory.push(item);
          position++;
        } else if (distinctHistory[position - 1].day === item.day) {
          distinctHistory[position - 1].cost += item.cost;
        } else {
          distinctHistory.push(item);
          position++;
        }
      }

      let lastDay = today.getDate();
      let fullHistory = [];
      let budget = [];
      let dayLabel = [];
      let sortedHistoryPosition = 0;
      let accumulatedCost = 0;
      let budgetCost = props.history[0].budget;

      for (let day = 1; day <= lastDay; day++) {
        const checkDay = distinctHistory[sortedHistoryPosition];
        if (checkDay.day == day) {
          accumulatedCost += checkDay.cost;
          if (sortedHistoryPosition < distinctHistory.length - 1) {
            sortedHistoryPosition++;
          }
        }
        fullHistory.push(accumulatedCost);
        budget.push(budgetCost);
        dayLabel.push(day);
      }
      setChartData({ fullHistory, budget, dayLabel });
    }
  }, [props.history]);
  if (chartData) {
    return (
      <div>
        <h3>Accumulated Spend</h3>
        <Line
          options={{
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Spend / £",
                  },
                },
              ],
              xAxes: [{ scaleLabel: { display: true, labelString: "Day" } }],
            },
          }}
          data={{
            labels: chartData.dayLabel,
            datasets: [
              {
                label: "Spending",
                data: chartData.fullHistory,
                tension: 0.1,
                borderColor: "rgb(16,165,245)",
                backgroundColor: "rgba(16,165,245,0.25)",
              },
              {
                label: "Limit",
                data: chartData.budget,
                fill: false,
                radius: 0,
                borderColor: "red",
                borderDash: [10, 5],
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
