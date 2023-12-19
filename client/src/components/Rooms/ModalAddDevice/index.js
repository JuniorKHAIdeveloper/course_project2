import { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DeviceConnect from "./DeviceConnect";
import { AppContext } from "../../../storage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  position: "relative",
};

export default function ModalAddDevice({ open, setOpen, user, devices }) {
  const {
    rooms,
    currentRoomId,
    currentRoomDevices,
    availableDevices,
    setCurrentRoomDevices,
    setFilteredDevices,
    setCurrentRoomId,
    setAlert,
  } = useContext(AppContext);

  // useEffect(() => {
  //   if (currentRoomId) {
  //     const alreadyPickedDevices = rooms?.map((room) => room.devices).flat();

  //     const filteredDevices = currentRoomDevices?.filter(
  //       (device) => !alreadyPickedDevices.includes(device.deviceId)
  //     );

  //     setFilteredDevices(filteredDevices);
  //   }
  // }, [currentRoomId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedPickedDevices = currentRoomDevices
      .filter((device) => device.isConnected === true)
      .map((device) => device.deviceId);
    // const data = new FormData(event.currentTarget);
    const formData = {
      userId: user.id.id,
      roomId: currentRoomId,
      devices: parsedPickedDevices,
    };

    const apiUrl = "/app/room/devices";
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
      setAlert({message: "Devices added!", type: 'success'})
      handleClose();
    } catch (error) {
      setAlert({message: "Devices not added!", type: 'error'})
      console.error("Error:", error.message);
    }

    // CLEAR STATE ON SEND
    // setCurrentRoomId("");
    // setCurrentRoomDevices([]);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Card variant="outlined" sx={style}>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add devices to room
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ m: 0, p: 0, width: "600px" }}
              >
                <DialogContent
                  dividers
                  sx={{
                    maxHeight: "600px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid container spacing={0} sx={{ m: 0, width: "100%" }}>
                    {currentRoomDevices?.map((device) => (
                      <DeviceConnect
                        currentDevice={device}
                        devices={currentRoomDevices}
                        setCurrentRoomDevices={setCurrentRoomDevices}
                      />
                    ))}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1, ml: 2, mr: 2 }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Box>
            </BootstrapDialog>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
