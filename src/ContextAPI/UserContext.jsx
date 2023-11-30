import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
