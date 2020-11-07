import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/userContext ";
import { LineChart, PieChart } from "../index/index";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        setHistory(null);
      }

      if (!("error" in breakdown)) {
        setBreakdown(breakdown);
      } else {
        setBreakdown(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (date) {
      sendDate(date);
    }
  }, [date]);
  return (
    <div>
      <div className="formDiv">
        <h2 className="graduate">History</h2>
        <h3>Month</h3>
        <Form>
          <Form.Group>
            <Form.Control
              required
              type="month"
              max={`${today.getFullYear()}-${month}`}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            ></Form.Control>
            <Form.Text className="text-muted">
              Manual Format: YYYY-MM.
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
      {history && date && <LineChart history={history} date={date} />}
      {breakdown && <PieChart breakdown={breakdown} />}
    </div>
  );
}
