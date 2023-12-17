import React, { createContext } from "react";

export const AppContext = createContext({
  user: null,
  devices: [],
  isModalOpen: false,
  isModalAddDeviceOpen: false,
  currentRoomId: "",
  currentRoomDevices: [],
  rooms: [],
  alert: null,
});

export default function AppContextProvider({ children }) {
  const [data, setData] = React.useState({
    user: null,
    devices: [],
    isModalOpen: false,
    isModalAddDeviceOpen: false,
    currentRoomId: "",
    currentRoomDevices: [],
    rooms: [],
  });

  const setUser = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        user: value,
      };
    });
  };

  const setDevices = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        devices: value,
      };
    });
  };

  const setIsModalOpen = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        isModalOpen: value,
      };
    });
  };

  const setIsModalAddDeviceOpen = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        isModalAddDeviceOpen: value,
      };
    });
  };

  const setCurrentRoomId = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        currentRoomId: value,
      };
    });
  };

  const setCurrentRoomDevices = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        currentRoomDevices: value,
      };
    });
  };

  const setFilteredDevices = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        currentRoomDevices: value,
      };
    });
  };

  const setRooms = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        rooms: value,
      };
    });
  };

  const setAlert = (value) => {
    setData((currentState) => {
      return {
        ...currentState,
        alert: value,
      };
    });
  };

  const {
    user,
    devices,
    isModalOpen,
    isModalAddDeviceOpen,
    currentRoomId,
    currentRoomDevices,
    rooms,
    alert,
  } = data;

  return (
    <AppContext.Provider
      value={{
        user,
        devices,
        isModalOpen,
        isModalAddDeviceOpen,
        currentRoomId,
        currentRoomDevices,
        rooms,
        alert,
        setUser,
        setDevices,
        setIsModalOpen,
        setIsModalAddDeviceOpen,
        setCurrentRoomId,
        setCurrentRoomDevices,
        setRooms,
        setFilteredDevices,
        setAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
