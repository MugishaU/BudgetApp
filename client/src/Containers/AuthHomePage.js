import React, { useContext, useEffect } from "react";
import * as firebase from "firebase";
import { AuthNavbar } from "../Components/index/index";
import { UserContext } from "../Context/userContext ";

const getToken = () => {
  console.log(firebase.auth().currentUser.getIdToken(true));
};

export default function AuthHomePage() {
  const { authFetch, profile, setProfile, setHistory } = useContext(
    UserContext
  );
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
  let today = new Date();

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const profileFetch = authFetch(
          `https://budgt-app.herokuapp.com/user`,
          options
        );

        const historyFetch = authFetch(
          `https://budgt-app.herokuapp.com/history?month=${
            today.getMonth() + 1
          }&year=${today.getFullYear()}`,
          options
        );

        const historyPromise = await historyFetch;
        const profilePromise = await profileFetch;

        const history = await historyPromise.json();
        const profile = await profilePromise.json();

        setProfile(profile);
        setHistory(history);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <AuthNavbar />
      <h1>You're Logged In 🎉</h1>
      {profile && (
        <h1>
          {profile.username}'s {month[today.getMonth()]} {today.getFullYear()}
        </h1>
      )}
      <h3>Email: {firebase.auth().currentUser.email}</h3>
      <button onClick={getToken}>Get Token</button>
    </>
  );
}
