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
  const [date, setDate] = useState("");
  const sendDate = (date) => {};
  return (
    <div>
      <h2>View History</h2>
      <h3>Select Month</h3>
      <form>
        <input
          type="month"
          max={`${today.getFullYear()}-${month}`}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
      </form>
    </div>
  );
}
