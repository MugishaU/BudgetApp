import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user] = useAuthState(firebase.auth());
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          setToken(idToken);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setToken(null);
      setProfile(null);
      setHistory([]);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ profile, setProfile, history, setHistory, token }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
