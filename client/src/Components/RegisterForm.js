import React, { useState } from "react";
import * as firebase from "firebase";

const login = (email, password) => {};

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
          register(email, password);
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
          value={password}
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
          minLength="6"
        />
        <input type="submit" name="submit" value="Login" />
      </form>
    </>
  );
}
