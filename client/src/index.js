import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import UserContextProvider from "./Context/userContext ";
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyCe2GMRcKbCInRUE54SH1UiciA6U6xAb6c",
  authDomain: "budgetapp-1110d.firebaseapp.com",
  databaseURL: "https://budgetapp-1110d.firebaseio.com",
  projectId: "budgetapp-1110d",
  storageBucket: "budgetapp-1110d.appspot.com",
  messagingSenderId: "319333016623",
  appId: "1:319333016623:web:e9683f17506daa5c5ed2da",
});

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
  
     return (
        promiseInProgress && 
        <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Loader type="ThreeDots" color="#0275d8" height="100" width="100" />
      </div>
    );  
   }

ReactDOM.render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
      <LoadingIndicator/>
    </BrowserRouter>
  </UserContextProvider>,
  document.getElementById("root")
);
