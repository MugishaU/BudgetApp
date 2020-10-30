import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import { UserContext } from "../../Context/userContext ";

export default withRouter(function SetLimit(props) {
  const { authFetch, dashboard, setDashboard } = useContext(UserContext);
  const [budget, setBudget] = useState("");
  const handleSubmit = async (budget) => {
    const body = {
      budget: budget,
    };

    const options = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    const fetch = await authFetch(
      "https://budgt-app.herokuapp.com/budget",
      options
    );
    const fetchResult = await fetch.json();
    const fetchError = fetchResult.error;

    if (!fetchError) {
      alert(fetchResult);
      setDashboard(!dashboard);
    } else {
      alert(fetchError);
    }
  };
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Set Your Monthly Budget!</h2>
      <h4>(Don't worry you can change it later)</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(budget);
        }}
      >
        <input
          required
          type="number"
          name="Cost"
          placeholder="Budget"
          min="0.01"
          step="0.01"
          value={budget}
          onChange={(event) => {
            setBudget(event.target.value);
          }}
        ></input>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
});
