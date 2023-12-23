import DeleteIcon from "@mui/icons-material/Delete";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Switch,
  ToggleButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useContext } from "react";
import { deleteDevice } from "../../API/devices";
import { AppContext } from "../../storage";
import TransitionsModal from "./Modal";
import NewDevice from "./NewDevice";


export default function Devices() {
  const {
    user,
    isModalOpen,
    setIsModalOpen,
    devices = [],
    isDevicesLoading,
    setAlert,
    updateDevices,
  } = useContext(AppContext);

  const deviceDeleteHandler = async (deviceId) => {
    const response = await deleteDevice(deviceId);
    if (response) {
      setAlert({ message: "Device deleted!", type: "success" });
      updateDevices();
    } else {
      setAlert({ message: "Device delete error!", type: "error" });
    }
  };

  const renderedDevices = devices?.map((device) => {

    return (
      <Grid item sm={6} md={4} xl={2} sx={{ p: 1 }}>
        <Badge
          badgeContent=""
          color={`${device.active ? "success" : "error"}`}
          sx={{ width: "100%" }}
        >
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardActionArea>
              <CardMedia
                component="div"
                height="140"
                alt="green iguana"
                sx={{ p: 2 }}
              >
                <SettingsRemoteIcon sx={{ width: "100%", height: "100px" }} />
              </CardMedia>
              <CardContent sx={{ pt: 0 }}>
                <Typography
                  variant="p"
                  component="body"
                  sx={{ textAlign: "center" }}
                >
                  {device.name}
                </Typography>
              </CardContent>
              <div style={{ display: "flex" }}>
                <ToggleButton
                  sx={{ ml: "auto", mr: 1, mb: 1 }}
                  onClick={() => deviceDeleteHandler(device.id.id)}
                >
                  <DeleteIcon />
                </ToggleButton>
              </div>
            </CardActionArea>
          </Card>
        </Badge>
      </Grid>
    );
  });

  renderedDevices.push(
    <NewDevice openModalHandler={() => setIsModalOpen(true)} />
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography component="h3" variant="h5" sx={{ ml: 1, mb: 1 }}>
        Devices:
      </Typography>
      {isDevicesLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <span>
            <CircularProgress size={100} />
          </span>
        </Box>
      ) : (
        <Grid container spacing={1} sx={{ m: 0, width: "100%" }}>
          {renderedDevices}
        </Grid>
      )}

      <TransitionsModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        user={user}
      />
    </Box>
  );
}
