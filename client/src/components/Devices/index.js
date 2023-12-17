import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import PowerIcon from "@mui/icons-material/Power";
import { AppContext } from "../../storage";
import NewDevice from "./NewDevice";
import TransitionsModal from "./Modal";

export default function Devices() {
  const { user, isModalOpen, setIsModalOpen, devices = [] } = useContext(AppContext);

  const renderedDevices = devices?.map((device) => (
    <Grid item sm={6} md={4} xl={2} sx={{ p: 1 }}>
      <Badge
        badgeContent=""
        color={`${device.active ? "success" : "error"}`}
        sx={{ width: "100%" }}
      >
        <Card variant="outlined" sx={{ width: "100%" }}>
          <CardActionArea>
            <CardMedia component="div" height="140" alt="green iguana" sx={{ p: 2 }}>
              <SettingsRemoteIcon
                sx={{ width: "100%", height: "100px" }}
              />
            </CardMedia>
            <CardContent>
              <Typography variant="p" component="body" sx={{textAlign: 'center'}}>
                {device.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Badge>
    </Grid>
  ))

  renderedDevices.push(<NewDevice openModalHandler={() => setIsModalOpen(true)} />);

  return (
    <Box sx={{p: 2}}>
      <Typography component="h3" variant="h5" sx={{ml: 1, mb: 1}}>Devices:</Typography>
      <Grid container spacing={1} sx={{ m: 0, width: "100%" }}>
        {renderedDevices}
      </Grid>

      <TransitionsModal open={isModalOpen} setOpen={setIsModalOpen} user={user} />
    </Box>
  );
}
