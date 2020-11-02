import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/userContext ";
import { withRouter } from "react-router";
import * as firebase from "firebase";

export default withRouter(function Profile(props) {
  const { profile, authFetch } = useContext(UserContext);
  const [budget, setBudget] = useState("");
  const sendBudget = async (budget) => {
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
      props.history.push("/");
    } else {
      alert(fetchError);
    }
  };
  const profileAction = async (action) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const fetch = await authFetch(
      `https://budgt-app.herokuapp.com/${action}`,
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
            sendBudget(budget);
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
      <br />
      <button
        onClick={(event) => {
          if (
            window.confirm(
              "Are you sure you want to clear all profile history? This cannot be undone."
            )
          ) {
            event.preventDefault();
            profileAction("reset");
          }
        }}
      >
        Reset Account
      </button>
      <button
        onClick={(event) => {
          if (
            window.confirm(
              "Are you sure you want to delete your Account? This cannot be undone."
            )
          ) {
            event.preventDefault();

            let user = firebase.auth().currentUser;
            let password = prompt("enter password");
            const credentials = firebase.auth.EmailAuthProvider.credential(
              user.email,
              password
            );

            user
              .reauthenticateWithCredential(credentials)
              .then(function () {
                profileAction("delete").then(() => user.delete());
              })
              .catch(function (error) {
                alert("Password Incorrect");
              });
          }
        }}
      >
        Delete Account
      </button>
    </div>
  );
});
