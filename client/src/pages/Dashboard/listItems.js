import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";


export function MainListItems() {
  let navigate = useNavigate();

  function navigateHandler(url) {
    navigate(url);
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigateHandler("account")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItemButton>
      <ListItemButton onClick={() => navigateHandler("devices")}>
        <ListItemIcon>
          <SettingsRemoteIcon />
        </ListItemIcon>
        <ListItemText primary="Devices" />
      </ListItemButton>
      <ListItemButton onClick={() => navigateHandler("rooms")}>
        <ListItemIcon>
          <MapsHomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Rooms" />
      </ListItemButton>
      <ListItemButton onClick={() => navigateHandler("aboutus")}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About Us" />
      </ListItemButton>
    </React.Fragment>
  );
}
