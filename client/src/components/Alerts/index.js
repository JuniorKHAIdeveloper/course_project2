import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../storage";

export default function Alerts() {
  const { alert, setAlert } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alert?.type}
        sx={{ width: "100%" }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
}
