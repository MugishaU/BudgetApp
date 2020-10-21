import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user] = useAuthState(firebase.auth());
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (firebase.auth().currentUser === null) {
      setProfile(null);
      setHistory([]);
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
        profile,
        setProfile,
        history,
        setHistory,
        authFetch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
