import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";
import { ProfileCard, LineChart, PieChart } from "../index/index";

export default function Dashboard() {
  const { dashboard, setDashboard, profile, history, breakdown } = useContext(
    UserContext
  );

  useEffect(() => {
    setDashboard(!dashboard);
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
