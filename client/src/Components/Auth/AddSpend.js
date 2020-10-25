import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";

export default function AddSpend() {
  const { authFetch, profile } = useContext(UserContext);
  const sendEntry = (description, category, cost, date) => {
    const dateArray = date.split("-");
    const body = {
      budget: profile.budget,
      description: description,
      category: category,
      cost: cost,
      day: dateArray[2],
      month: dateArray[1],
      year: dateArray[0],
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    authFetch("https://budgt-app.herokuapp.com/spend", options);
  };
  return (
    <div>
      <h2>Add Expenditure</h2>
      <form></form>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}
