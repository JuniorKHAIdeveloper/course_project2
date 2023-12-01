import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

export function MainListItems() {
  let navigate = useNavigate(); 

  function navigateHandler(url) {
    console.log(url);
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
    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
