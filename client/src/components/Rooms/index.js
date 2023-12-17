import { Box, CircularProgress } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../storage";
import Copyright from "../Copyright";
import ModalAddDevice from "./ModalAddDevice";
import ModalNewRoom from "./ModalNewRoom";
import NewRoom from "./NewRoom";
import Room from "./Room";
import Typography from "@mui/material/Typography";

export default function Rooms() {
  const {
    user,
    devices,
    rooms,
    isModalOpen,
    setIsModalOpen,
    isModalAddDeviceOpen,
    setIsModalAddDeviceOpen,
    currentRoomId,
    setCurrentRoomId,
    setCurrentRoomDevices,
    setRooms,
  } = useContext(AppContext);

  
  // const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("Rooms:" , rooms)
  console.log("RoomId:" , currentRoomId)

  async function fetchRooms() {
    const apiUrl = "/app/rooms";
    const formData = {
      userId: user.id.id,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const data = await fetchRooms();
        console.log(data);
        setRooms(data);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [user, isModalOpen, isModalAddDeviceOpen]);

  function getDevicesWithConnectionStatus(allDevices, currentRoomDevices) {
    return allDevices.map(device => {
      const isConnected = currentRoomDevices.includes(device.id.id);
      return {
        deviceId: device.id.id,
        isConnected: isConnected,
        name: device.name,
      };
    });
  }

  function currentRoomDevicesHandler(allDevices, currentRoomDevices) {
    const parsedDevices = getDevicesWithConnectionStatus(allDevices, currentRoomDevices);
    setCurrentRoomDevices(parsedDevices);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography component="h3" variant="h5">New Room:</Typography>
      <div>
        <NewRoom openModalHandler={() => setIsModalOpen(true)} />
      </div>
      <Typography component="h3" variant="h5">Rooms:</Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <span>
            <CircularProgress size={100} />
          </span>
        </Box>
      ) : (
        <div>
          {rooms
            ?.map((room, index) => (
              <Room
                key={room.name}
                data={room}
                setOpen={() => {
                  setIsModalAddDeviceOpen(true);
                  setCurrentRoomId(room._id);
                  currentRoomDevicesHandler(devices, room.devices);
                }}
              />
            ))
            .reverse()}
        </div>
      )}

      <ModalNewRoom open={isModalOpen} setOpen={setIsModalOpen} user={user} />
      <ModalAddDevice
        user={user}
        devices={devices}
        open={isModalAddDeviceOpen}
        setOpen={setIsModalAddDeviceOpen}
      />
    </Box>
  );
}
