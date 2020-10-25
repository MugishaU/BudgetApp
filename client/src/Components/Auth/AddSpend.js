import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";

export default function AddSpend() {
  let today = new Date();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(today.toISOString().slice(0, 10));

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
      <form>
        <input
          required
          type="text"
          name="description"
          placeholder="Short Description"
          maxLength="255"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></input>
        <br />
        <br />
        <input
          required
          type="number"
          name="Cost"
          placeholder="Cost"
          min="0.01"
          step="0.01"
          value={cost}
          onChange={(event) => {
            setCost(event.target.value);
          }}
        ></input>
        <br />
        <br />
        <input
          required
          type="date"
          name="Date"
          min={`${today.getFullYear()}-${today.getMonth() + 1}-01`}
          max={today.toISOString().slice(0, 10)}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
        <br />
        <br />
      </form>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}
