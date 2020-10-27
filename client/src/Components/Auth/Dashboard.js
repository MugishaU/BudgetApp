import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";
import { ProfileCard, LineChart, PieChart } from "../index/index";

export default function Dashboard() {
  const {
    authFetch,
    setProfile,
    setHistory,
    setBreakdown,
    profile,
    history,
    breakdown,
  } = useContext(UserContext);
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

        if (!("error" in profile)) {
          setProfile(profile);
        }

        if (!("error" in history)) {
          setHistory(history);
        }

        if (!("error" in breakdown)) {
          setBreakdown(breakdown);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/spend">Add Expenditure</Link>
      <ProfileCard profile={profile} history={history} />
      <LineChart history={history} />
      <PieChart breakdown={breakdown} />  
    </div>
  );
}
