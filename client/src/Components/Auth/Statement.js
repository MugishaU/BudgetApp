import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/userContext ";
import Table from "react-bootstrap/Table";

export default function Statement(props) {
  const { history } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [sortedHistory, setSortedHistory] = useState(null);

  useEffect(() => {
    if (props.date) {
      let dateArray = props.date.split("-");
      setDate(new Date(dateArray[0], dateArray[1], 0));
    } else {
      setDate(new Date());
    }
  }, [props.date]);

  useEffect(() => {
    if (props.spendingHistory) {
      setSortedHistory(
        props.spendingHistory
          .slice()
          .reverse()
          .sort((a, b) => a.day - b.day)
      );
    } else if (history) {
      setSortedHistory(
        history
          .slice()
          .reverse()
          .sort((a, b) => a.day - b.day)
      );
    }
  }, [props.spendingHistory, history]);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateEnd = ["th", "st", "nd", "rd"];

  return (
    <div>
      <h2 className="graduate">
        {month[date.getMonth()]} {date.getFullYear()} Statement
      </h2>
      <Table striped bordered>
        <tbody>
          <tr>
            <th className="text-center graduate">Description</th>
            <th className="text-center graduate">Category</th>
            <th className="text-center graduate">Day</th>
            <th className="text-center graduate">Cost</th>
          </tr>
          {sortedHistory &&
            sortedHistory.map((item, idx) => (
              <tr key={idx}>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td className="text-right">
                  {String(item.day).split("").slice(-1) > 0 &&
                  String(item.day).split("").slice(-1) <= 3
                    ? item.day +
                      dateEnd[Number(String(item.day).split("").slice(-1))]
                    : item.day + dateEnd[0]}
                </td>
                <td className="text-right">£{item.cost.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
