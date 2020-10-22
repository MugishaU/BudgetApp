import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext ";

export default function ProfileCard() {
  const { profile, history } = useContext(UserContext);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (history) {
      let total = history.reduce((a, b) => {
        return a + b.cost;
      }, 0);

      setTotal(total);
    }
  }, [history]);
  if (profile && history) {
    return (
      <div>
        <h3>Overview</h3>
        <table>
          <tbody>
            <tr>
              <th>Limit</th>
              <td>£{profile.budget.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Spent</th>
              <td>£{total.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Remaining</th>
              <td>
                {profile.budget > total
                  ? `£${(profile.budget - total).toFixed(2)}`
                  : `-£${-(profile.budget - total).toFixed(2)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}
