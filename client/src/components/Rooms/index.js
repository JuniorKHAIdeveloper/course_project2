import { Box, CircularProgress } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../storage";
import Copyright from "../Copyright";
import ModalAddDevice from "./ModalAddDevice";
import ModalNewRoom from "./ModalNewRoom";
import NewRoom from "./NewRoom";
import Room from "./Room";
import Typography from "@mui/material/Typography";
import { fetchRooms } from "../../API/rooms";


export default function Rooms() {
  const {
    user,
    devices,
    rooms,
    isModalOpen,
    setIsModalOpen,
    isModalAddDeviceOpen,
    availableDevices,
    setIsModalAddDeviceOpen,
    currentRoomId,
    setCurrentRoomId,
    setCurrentRoomDevices,
    setRooms,
    updateRooms,
    setAvailableDevices,
  } = useContext(AppContext);

  
  // const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const data = await fetchRooms(user);
        setRooms(data);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [user, isModalOpen, isModalAddDeviceOpen]);

  function getDevicesWithConnectionStatus(allDevices, currentRoomDevices) {
    return allDevices?.map(device => {
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

  function filterDevices(roomId) {
    const otherRooms = rooms.filter((room) => room._id !== roomId);
    const otherRoomsDevices = otherRooms.map((room) => room.devices);
    const arrayOtherDevices = otherRoomsDevices.flat();
    const currentRoomAvailableDevices = devices.filter((device) => !arrayOtherDevices.includes(device.id.id));
    console.log(devices)
    console.log('Array of devices', currentRoomAvailableDevices);
    return currentRoomAvailableDevices;
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
                  const roomDevices = filterDevices(room._id)
                  currentRoomDevicesHandler(roomDevices, room.devices);
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
