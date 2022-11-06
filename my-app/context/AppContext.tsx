import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext({});

export const AppContextProvider = ({ children }: Props) => {
  const [appContext, setAppContext] = useState({});

  return (
    <AppContext.Provider value={[appContext, setAppContext]}>
      {children}
    </AppContext.Provider>
  );
};
