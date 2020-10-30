import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";

export default withRouter(function AddSpend(props) {
  let today = new Date();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(today.toISOString().slice(0, 10));

  const { authFetch, profile } = useContext(UserContext);
  const sendEntry = async (date, budget, description, category, cost) => {
    const dateArray = date.split("-");
    const body = {
      budget: budget,
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

    const fetch = await authFetch(
      "https://budgt-app.herokuapp.com/spend",
      options
    );
    const fetchResult = await fetch.json();
    const fetchError = fetchResult.error;

    if (!fetchError) {
      alert(fetchResult);
    } else {
      alert(fetchError);
    }
  };
  if (profile) {
    return (
      <div>
        <h2>Add Expenditure</h2>
        <form
          id="spend"
          onSubmit={(event) => {
            event.preventDefault();
            sendEntry(date, profile.budget, description, category, cost);
          }}
        >
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
          <select
            required
            form="spend"
            name="category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value={""}>Select a Category</option>
            <option value={"Food"}>Food</option>
            <option value={"Groceries"}>Groceries</option>
            <option value={"Bills"}>Bills</option>
            <option value={"Travel"}>Travel</option>
            <option value={"Subscriptions"}>Subscriptions</option>
            <option value={"Misc"}>Miscellaneous</option>
          </select>
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
            name="date"
            min={`${today.getFullYear()}-${today.getMonth() + 1}-01`}
            max={today.toISOString().slice(0, 10)}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          ></input>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  } else {
    return null;
  }
});
