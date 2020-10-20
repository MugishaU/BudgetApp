import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

const registerDatabase = (token, username) => {
  const body = { username: username };
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", token: token },
  };
  fetch("https://budgt-app.herokuapp.com/register", options)
    .then((r) => r.json())
    .then((data) => alert(data))
    .catch((error) => {
      throw "Database Error";
    });
};

const registerFirebase = (username, email, password, password2) => {
  if (password === password2) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        // alert(data.user.xa);
        registerDatabase(data.user.xa, username);
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Passwords Do Not Match!");
  }
};

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          registerFirebase(username, email, password, password2);
          setPassword("");
          setPassword2("");
        }}
      >
        <input
          required
          type="text"
          name="username"
          placeholder="Preferred Name"
          value={username}
          maxLength="20"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <br />
        <input
          required
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <br />
        <input
          required
          type="password"
          name="password"
          placeholder="Choose Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          minLength="6"
        />
        <br />
        <br />
        <input
          required
          type="password"
          name="password2"
          placeholder="Re-enter Password"
          value={password2}
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
          minLength="6"
        />
        <br />
        <br />
        <input type="submit" name="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/">Login Here</Link>
      </p>
    </>
  );
}
