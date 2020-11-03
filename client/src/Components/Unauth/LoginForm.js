import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <div className="formDiv">
      <h1 className="display-2">
        <u>Login</u>
      </h1>
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
