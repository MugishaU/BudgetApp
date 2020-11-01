import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/userContext ";
import * as firebase from "firebase";

export default function Profile() {
  const { profile } = useContext(UserContext);
  const [budget, setBudget] = useState("");
  useEffect(() => {
    setBudget(profile.budget);
  }, [profile]);
  return (
    <div>
      <h2>Profile</h2>
      <h3>Username: {profile.username}</h3>
      <h3>Email: {firebase.auth().currentUser.email}</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (budget != profile.budget) {
            console.log(budget);
          } else {
            alert("Budget Unchanged");
          }
        }}
      >
        <label>
          Budget:{" "}
          <input
            required
            type="number"
            name="Budget"
            placeholder="Budget"
            min="0.01"
            step="0.01"
            value={budget}
            onChange={(event) => {
              setBudget(event.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
