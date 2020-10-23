import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext ";
import { Line } from "react-chartjs-2";

export default function LineChart() {
  const { history } = useContext(UserContext);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (history) {
      const sortedHistory = history.sort((a, b) => a.day - b.day);
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

      let lastDay = distinctHistory.slice(-1)[0].day;
      let fullHistory = [];
      let budget = [];
      let dayLabel = [];
      let sortedHistoryPosition = 0;
      let accumulatedCost = 0;
      let budgetCost = history[0].budget;

      for (let day = 1; day <= lastDay; day++) {
        const checkDay = distinctHistory[sortedHistoryPosition];
        if (day < checkDay.day) {
          // Do Nothing
        } else if (day == checkDay.day) {
          accumulatedCost += checkDay.cost;
          sortedHistoryPosition++;
        }
        fullHistory.push(accumulatedCost);
        budget.push(budgetCost);
        dayLabel.push(day);
      }
      setChartData({ fullHistory, budget, dayLabel });
    }
  }, [history]);
  if (chartData) {
    return (
      <div>
        <Line
          data={{
            labels: chartData.dayLabel,
            datasets: [
              { label: "Spending", data: chartData.fullHistory },
              { label: "Limit", data: chartData.budget },
            ],
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}
