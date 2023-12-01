import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  return (
    <AuthContext.Provider value={{ setUser, user, tasks, setTasks }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
