import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  // const data = "Hello";

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
