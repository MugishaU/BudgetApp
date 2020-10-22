import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext ";
import { ProfileCard, LineChart } from "../index/index";

export default function Dashboard() {
  const { authFetch, setProfile, setHistory, setBreakdown } = useContext(
    UserContext
  );
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

        setProfile(profile);
        setHistory(history);
        setBreakdown(breakdown);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <ProfileCard />
      <LineChart />
    </div>
  );
}
