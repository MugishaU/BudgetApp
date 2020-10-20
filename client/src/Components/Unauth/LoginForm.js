import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          login(email, password);
          setPassword("");
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
        <br />
        <br />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <br />
        <input type="submit" name="submit" value="Login" />
      </form>
      <p>
        Don't already have an account? <Link to="/register">Register Here</Link>
      </p>
    </>
  );
}
