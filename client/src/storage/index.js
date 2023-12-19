import React, { createContext } from "react";
import { fetchDevices } from "../API/dashboard";
import { fetchRooms } from "../API/rooms";

export const AppContext = createContext({
  user: null,
  devices: [],
  isModalOpen: false,
  isModalAddDeviceOpen: false,
  currentRoomId: "",
  currentRoomDevices: [],
  rooms: [],
  alert: null,
  availableDevices: [],
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
    isDevicesLoading: true,
    availableDevices: [],
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
        isDevicesLoading: false,
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
    console.log("runs!")
    setData((currentState) => {
      return {
        ...currentState,
        alert: value,
      };
    });
  };

  const updateDevices = async () => {
    const fetchData = async () => {
      const devicesData = await fetchDevices(user);
      
      return devicesData;
    };

    const data = await fetchData();

    setData((currentState) => {
      return {
        ...currentState,
        devices: data,
      };
    });
  }

  const updateRooms = async (user) => {
      const fetchData = async () => {
        const roomsData = await fetchRooms(user);
        
        return roomsData;
      };
  
      const data = await fetchData();

      setData((currentState) => {
        return {
          ...currentState,
          rooms: data,
        };
      });
  }

  const setAvailableDevices = (value) => {
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
    isDevicesLoading,
    availableDevices,
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
        isDevicesLoading,
        availableDevices,
        setUser,
        setDevices,
        setIsModalOpen,
        setIsModalAddDeviceOpen,
        setCurrentRoomId,
        setCurrentRoomDevices,
        setRooms,
        setFilteredDevices,
        setAlert,
        updateDevices,
        updateRooms,
        setAvailableDevices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
