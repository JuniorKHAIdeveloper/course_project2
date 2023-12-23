import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AppContext } from "../../../storage";
import { BootstrapDialog, style } from "./styles";


export default function TransitionsModal({ open, setOpen, user }) {
  const { setAlert } = useContext(AppContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      deviceName: data.get("deviceName"),
      accessToken: data.get("accessToken"),
      customerId: user.customerId.id,
      userId: user.id.id,
    };

    const apiUrl = "/iot/device-with-credentials";
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
      setAlert({ message: "Device created!", type: "success" });
      handleClose();
    } catch (error) {
      setAlert({ message: "Device not created!", type: "error" });
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
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
                Add new device
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
                sx={{ m: 0, p: 0 }}
              >
                <DialogContent dividers>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="deviceName"
                    label="Device name"
                    name="deviceName"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="accessToken"
                    label="Access token"
                    id="accessToken"
                  />
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
