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
  const sendDate = (date) => {
    const dateArray = date.split("-");
    console.log(dateArray[1]);
    console.log(dateArray[0]);
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
