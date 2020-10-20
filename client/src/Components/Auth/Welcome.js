import React, { useContext } from "react";
import * as firebase from "firebase";
import { UserContext } from "../Context/userContext ";

export default function Welcome() {
  const { data } = useContext(UserContext);

  return <div></div>;
}
