import React, { useContext, useEffect } from "react";
import * as firebase from "firebase";
import { UserContext } from "../../Context/userContext ";

export default function Dashboard() {
  const { authFetch, setProfile, setHistory } = useContext(UserContext);
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

  return <div></div>;
}
