import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default withRouter(function AddSpend(props) {
  let today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = String(month);
    month = "0" + month;
  }
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
      props.history.push("/");
    } else {
      alert(fetchError);
    }
  };
  if (profile) {
    return (
      <div className="formDiv">
        <br />
        <h2 className="graduate">Add Expenditure</h2>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            sendEntry(date, profile.budget, description, category, cost);
          }}
        >
          <Form.Group>
            <Form.Control
              required
              style={{ color: "black" }}
              size="lg"
              type="text"
              name="description"
              placeholder="Short Description"
              maxLength="255"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Maximum 255 characters.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              required
              style={{ color: "black" }}
              size="lg"
              as="select"
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
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              required
              style={{ color: "black" }}
              size="lg"
              type="number"
              name="Cost"
              placeholder="Cost"
              min="0.01"
              step="0.01"
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
            <Form.Text className="text-muted">In GBP.</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              required
              style={{ color: "black" }}
              size="lg"
              type="date"
              name="date"
              min={`${today.getFullYear()}-${month}-01`}
              max={today.toISOString().slice(0, 10)}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Manual Format: "YYYY-MM-DD".
            </Form.Text>
          </Form.Group>

          <Button
            style={{ marginRight: 10 }}
            size="lg"
            variant="outline-secondary"
            to="/"
            as={Link}
          >
            BACK
          </Button>

          <Button size="lg" variant="success" type="submit">
            SUBMIT
          </Button>
        </Form>
      </div>
    );
  } else {
    return null;
  }
});
