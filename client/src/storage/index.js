import React, { createContext } from "react";

export const AppContext = createContext({
  user: null,
  isModalOpen: false,
});

export default function AppContextProvider({ children }) {
  const [data, setData] = React.useState({
    user: null,
    isModalOpen: false,
  });

  const setUser = (value) => {
    setData({
      ...data,
      user: value,
    });
  };

  const setIsModalOpen = (value) => {
    setData({
      ...data,
      isModalOpen: value,
    });
  };

  const {user, isModalOpen} = data;

  return (
    <AppContext.Provider value={{ user, isModalOpen, setUser, setIsModalOpen }}>
      {children}
    </AppContext.Provider>
  );
}
