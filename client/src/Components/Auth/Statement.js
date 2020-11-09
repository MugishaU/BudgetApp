import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/userContext ";

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

  return (
    <div>
      <h2 className="graduate">
        {month[date.getMonth()]} {date.getFullYear()} Statement
      </h2>
      <ul>
        {sortedHistory &&
          sortedHistory.map((item, idx) => (
            <li key={idx}>{item.description}</li>
          ))}
      </ul>
    </div>
  );
}
