import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function DeviceConnect({
  devices,
  currentDevice,
  setCurrentRoomDevices,
}) {
  function pickHandler() {
    const devicesCopy = devices.slice();
    const currentDeviceIndex = devicesCopy.indexOf(currentDevice);
    const updatedDevice = {
      ...currentDevice,
      isConnected: !currentDevice.isConnected,
    };
    if (currentDeviceIndex !== -1)
      devicesCopy[currentDeviceIndex] = updatedDevice;
    setCurrentRoomDevices(devicesCopy);
  }

  return (
    <Grid item sm={6} md={4} xl={4} sx={{ p: 1, position: "relative" }}>
      {currentDevice.isConnected ? (
        <span
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: "white",
            height: "20px",
            width: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon color="primary" />
        </span>
      ) : (
        <></>
      )}
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          border: `2px solid ${currentDevice.isConnected ? "#1565c0" : "none"}`,
        }}
        onClick={() => pickHandler()}
      >
        <CardActionArea name={currentDevice?.name}>
          <CardMedia component="div" height="140" alt="green iguana">
            <SettingsRemoteIcon sx={{ width: "100%", height: "100px" }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
              {currentDevice?.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
