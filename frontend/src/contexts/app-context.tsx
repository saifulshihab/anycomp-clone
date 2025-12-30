"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

type AppContext = {
  isSidebarDrawerOpen: boolean;
  setIsSidebarDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isSidebarDrawerOpen,
        setIsSidebarDrawerOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
