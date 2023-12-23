import { Grid } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../storage";
import NewDevice from "../../Devices/NewDevice";
import DeviceItem from "./DeviceItem";


export default function RoomDevices({ openModalHandler, room }) {
  const { devices = [] } = useContext(AppContext);
  const devicesCopy = devices.slice();

  const renderedDevices = devicesCopy
    .filter((device) => room.devices.includes(device.id.id))
    .map((device) => <DeviceItem device={device} />);
  renderedDevices.push(
    <NewDevice openModalHandler={openModalHandler} icon="settings" />
  );

  return (
    <Grid container spacing={0} sx={{ m: 0, width: "100%", height: "100%" }}>
      {renderedDevices}
    </Grid>
  );
}
