import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { trackPromise } from 'react-promise-tracker';

const login = (email, password) => {
  trackPromise(firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message)));
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="formDiv">
      <br />
      <br />
      <h1 className="display-1 text-center">
        <u className="graduate">BDGT</u>
      </h1>
      <h3 className="text-muted text-center cursive">Budgeting, Simplified.</h3>
      <br />
      <h2 className="display-3">Login</h2>
      <br />
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          login(email, password);
          setPassword("");
        }}
      >
        <Form.Group>
          <Form.Control
            required
            size="lg"
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Control
          required
          size="lg"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />

        <Button size="lg" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <br />
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}
