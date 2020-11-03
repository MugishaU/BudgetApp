import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import {
  AuthNavbar,
  Dashboard,
  AddSpend,
  SetLimit,
  History,
  Profile,
} from "../Components/index/index";
import Error404 from "../Components/Error404";
import { UserContext } from "../Context/userContext ";

export default withRouter(function AuthHomePage(props) {
  const {
    profile,
    dashboard,
    authFetch,
    setProfile,
    setHistory,
    setBreakdown,
  } = useContext(UserContext);
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
    //problem
    if (props.location.pathname == "/register") {
      props.history.push("/");
    }
    //Problem
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const historyFetch = authFetch(
          `https://budgt-app.herokuapp.com/history?month=${
            today.getMonth() + 1
          }&year=${today.getFullYear()}`,
          options
        );

        const breakdownFetch = authFetch(
          `https://budgt-app.herokuapp.com/breakdown?month=${
            today.getMonth() + 1
          }&year=${today.getFullYear()}`,
          options
        );

        const profileFetch = authFetch(
          `https://budgt-app.herokuapp.com/user`,
          options
        );

        const breakdownPromise = await breakdownFetch;
        const historyPromise = await historyFetch;
        const profilePromise = await profileFetch;

        const breakdown = await breakdownPromise.json();
        const history = await historyPromise.json();
        const profile = await profilePromise.json();

        if (!("error" in profile)) {
          setProfile(profile);
        } else {
          setProfile(null);
        }

        if (!("error" in history)) {
          setHistory(history);
        } else {
          setHistory(null);
        }

        if (!("error" in breakdown)) {
          setBreakdown(breakdown);
        } else {
          setBreakdown(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning 🌅");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon ☀️");
    } else if (hour >= 18 && hour < 21) {
      setGreeting("Good Evening 🌇");
    } else {
      setGreeting("Hey There, It's Late 🌙");
    }
  }, [dashboard]);

  return (
    <>
      <AuthNavbar />
      <div className="mainBody">
        <h2>{greeting}</h2>
        {profile && (
          <h1>
            {profile.username}'s {month[today.getMonth()]} {today.getFullYear()}
          </h1>
        )}
        {profile && profile.username && profile.budget && (
          <Switch className="mainBody">
            <Route exact path="/" component={Dashboard} />
            <Route path="/history" component={History} />
            <Route path="/profile" component={Profile} />
            <Route path="/spend" component={AddSpend} />
            <Route component={Error404} />
          </Switch>
        )}
        {profile && profile.username && !profile.budget && (
          <Switch className="mainBody">
            <Route exact path="/" component={SetLimit}></Route>
            <Route component={Error404} />
          </Switch>
        )}
      </div>
    </>
  );
});
