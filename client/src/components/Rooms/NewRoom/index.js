import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import PowerIcon from "@mui/icons-material/Power";
import { AppContext } from "../../../storage";
import AddIcon from '@mui/icons-material/Add';

export default function NewRoom({openModalHandler = () => {}}) {
  
  return (
    <Grid item sm={6} md={4} xl={2} sx={{my: 2}} onClick={() => openModalHandler()}>
        <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
          <CardActionArea sx={{display: 'flex', height: "100%"}}  id="new-room">
            <AddIcon sx={{ fontSize: 100, color: 'grey' }} />
          </CardActionArea>
        </Card>
    </Grid>
  );
}
