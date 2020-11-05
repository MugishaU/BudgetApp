import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/userContext ";
import { withRouter } from "react-router";
import * as firebase from "firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

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
    <div className="formDiv">
      <br />
      <Table striped bordered>
        <tbody style={{ fontSize: 25 }}>
          <th colSpan="2" className="text-center graduate">
            <h2 className="graduate">PROFILE</h2>
          </th>
          <tr>
            <th>USERNAME</th>
            <td>{profile.username}</td>
          </tr>
          <tr>
            <th>EMAIL</th>
            <td>{firebase.auth().currentUser.email}</td>
          </tr>
          <tr>
            <th>BUDGET</th>
            <td>
              <Form
                inline
                onSubmit={(event) => {
                  event.preventDefault();
                  if (budget != profile.budget) {
                    sendBudget(budget);
                  } else {
                    alert("Budget Unchanged");
                  }
                }}
              >
                <Form.Group>
                  <Form.Control
                    size="lg"
                    required
                    style={{ color: "black", marginRight: 10 }}
                    type="number"
                    name="Budget"
                    min="0.01"
                    step="0.01"
                    value={budget}
                    onChange={(event) => {
                      setBudget(event.target.value);
                    }}
                  />
                </Form.Group>

                <Button size="lg" type="submit" variant="success">
                  SUBMIT
                </Button>
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered size="sm">
        <tbody>
          <th colSpan="2" className="text-center graduate">
            <h2 className="graduate">ACCOUNT CONTROL</h2>
          </th>
          <tr>
            <td className="text-center">
              <Button
                variant="outline-warning"
                style={{ width: "75%" }}
                size="lg"
                onClick={(event) => {
                  if (
                    window.confirm("Are you sure? Resetting cannot be undone.")
                  ) {
                    event.preventDefault();
                    profileAction("reset");
                  }
                }}
              >
                RESET
              </Button>
            </td>
            <td className="text-center">
              <Button
                variant="outline-danger"
                style={{ width: "75%" }}
                size="lg"
                onClick={(event) => {
                  if (
                    window.confirm("Are you sure? Deleting cannot be undone.")
                  ) {
                    event.preventDefault();

                    let user = firebase.auth().currentUser;
                    let password = prompt("Re-enter Password");
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
                        alert(error);
                      });
                  }
                }}
              >
                DELETE
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});
