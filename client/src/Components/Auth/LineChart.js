import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext ";
import { Line } from "react-chartjs-2";

export default function LineChart() {
  const { history } = useContext(UserContext);
  useEffect(() => {
    if (history) {
      let sortedHistory = history.sort((a, b) => a.day - b.day);
    }
  }, [history]);
  return (
    <div>
      <Line
        data={{
          labels: ["1", "2", "3", "4"],
          datasets: [
            { label: "Spending Test", data: [12, 23, 34, 50] },
            { label: "Budget Test", data: [20, 20, 20, 20] },
          ],
        }}
      />
    </div>
  );
}
