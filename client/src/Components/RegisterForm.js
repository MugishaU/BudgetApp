import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

const register = (email, password, password2) => {
  if (password === password2) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => alert(data.user.uid))
      .then(() => {
        alert("Created");
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Passwords Do Not Match!");
  }
};

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          register(email, password, password2);
          setPassword("");
          setPassword2("");
        }}
      >
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
        <input
          required
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          minLength="6"
        />
        <input
          required
          type="password"
          name="password2"
          placeholder="Enter Password Again"
          value={password2}
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
          minLength="6"
        />
        <input type="submit" name="submit" value="Login" />
      </form>
      <p>
        Already have an account? <Link to="/">Login Here</Link>
      </p>
    </>
  );
}
