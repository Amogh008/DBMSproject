import React, { createContext, useState } from "react";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [LoggedIn, setLogin] = useState(false);
  const [uemail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  const [attempted, setAttempted] = useState(false);

  return (
    <SocketContext.Provider
      value={{
        LoggedIn,
        setLogin,
        uemail,
        setMail,
        pass,
        setPass,
        token,
        setToken,
        attempted,
        setAttempted,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
