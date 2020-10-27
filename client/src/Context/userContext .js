import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user] = useAuthState(firebase.auth());
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [breakdown, setBreakdown] = useState(null);
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    if (firebase.auth().currentUser === null) {
      setProfile(null);
      setHistory(null);
      setBreakdown(null);
    }
  }, [user]);

  const authFetch = async (url, options) => {
    if (firebase.auth().currentUser != null) {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const authOptions = { ...options };
      authOptions.headers.token = idToken;
      return fetch(url, authOptions);
    } else {
      return fetch(url, options);
    }
  };

  return (
    <UserContext.Provider
      value={{
        dashboard,
        setDashboard,
        profile,
        setProfile,
        history,
        setHistory,
        breakdown,
        setBreakdown,
        authFetch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
