import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";
import { ProfileCard, LineChart, PieChart } from "../index/index";

export default function History() {
  let today = new Date();
  let month = today.getMonth();
  if (month < 10) {
    month = String(month);
    month = "0" + month;
  }
  const { authFetch } = useContext(UserContext);
  const [date, setDate] = useState("");
  const [history, setHistory] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const sendDate = async (date) => {
    const dateArray = date.split("-");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const historyFetch = authFetch(
        `https://budgt-app.herokuapp.com/history?month=${dateArray[1]}&year=${dateArray[0]}`,
        options
      );

      const breakdownFetch = authFetch(
        `https://budgt-app.herokuapp.com/breakdown?month=${dateArray[1]}&year=${dateArray[0]}`,
        options
      );

      const breakdownPromise = await breakdownFetch;
      const historyPromise = await historyFetch;

      const breakdown = await breakdownPromise.json();
      const history = await historyPromise.json();

      if (!("error" in history)) {
        setHistory(history);
      } else {
        alert(history.error);
      }

      if (!("error" in breakdown)) {
        setBreakdown(breakdown);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>View History</h2>
      <h3>Select Month</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendDate(date);
        }}
      >
        <input
          required
          type="month"
          max={`${today.getFullYear()}-${month}`}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
