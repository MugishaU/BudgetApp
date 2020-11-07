import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import { UserContext } from "../../Context/userContext ";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
      if (props.location.pathname != "/") {
        props.history.push("/");
      }
    } else {
      alert(fetchError);
    }
  };
  return (
    <div className="formDiv">
      <br />
      <h1 className="graduate">Welcome!</h1>
      <h2 className="graduate">Set Your Monthly Budget</h2>
      <h5 className="text-muted">(Don't worry you can change it later)</h5>
      <br />
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(budget);
        }}
      >
        <Form.Group>
          <Form.Control
            required
            size="lg"
            style={{ color: "black" }}
            type="number"
            name="Cost"
            placeholder="Budget"
            min="0.01"
            step="0.01"
            value={budget}
            onChange={(event) => {
              setBudget(event.target.value);
            }}
          />
          <Form.Text className="text-muted">In GBP.</Form.Text>
        </Form.Group>
        <Button size="lg" variant="success" type="submit">
          SUBMIT
        </Button>
      </Form>
    </div>
  );
});
