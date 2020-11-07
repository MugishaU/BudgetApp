import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function ProfileCard(props) {
  const { profile, history } = props;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (history) {
      let total = history.reduce((a, b) => {
        return a + b.cost;
      }, 0);
      setTotal(total);
    }
  }, [history]);
  if (profile) {
    return (
      <div>
        <Table striped bordered>
          <tbody style={{ fontSize: 25 }}>
            <tr>
              <th colSpan="2" className="text-center graduate">
                <h3 className="graduate">OVERVIEW</h3>
              </th>
            </tr>

            <tr>
              <th>BUDGET</th>
              <td>£{profile.budget.toFixed(2)}</td>
            </tr>
            <tr>
              <th>SPENT</th>
              <td>£{total.toFixed(2)}</td>
            </tr>
            <tr>
              <th
                style={{ color: profile.budget - total > 0 ? "black" : "red" }}
              >
                {profile.budget - total >= 0 ? "REMAINING" : "OVERBUDGET"}
              </th>
              <td
                style={{ color: profile.budget - total > 0 ? "black" : "red" }}
              >
                {profile.budget >= total
                  ? `£${(profile.budget - total).toFixed(2)}`
                  : `-£${Math.abs(profile.budget - total).toFixed(2)}`}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  return null;
}
