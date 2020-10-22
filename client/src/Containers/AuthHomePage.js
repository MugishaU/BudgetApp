import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthNavbar, Dashboard } from "../Components/index/index";
import { UserContext } from "../Context/userContext ";

export default function AuthHomePage() {
  const { profile } = useContext(UserContext);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [greeting, setGreeting] = useState();
  let today = new Date();
  let hour = today.getHours();
  useEffect(() => {
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning 🌅");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon ☀️");
    } else if (hour >= 18 && hour < 21) {
      setGreeting("Good Evening 🌇");
    } else {
      setGreeting("Hey There, It's Late 🌙");
    }
  }, []);

  return (
    <>
      <AuthNavbar />
      <h2>{greeting}</h2>
      {profile && (
        <h1>
          {profile.username}'s {month[today.getMonth()]} {today.getFullYear()}
        </h1>
      )}
      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
      </Switch>
    </>
  );
}
