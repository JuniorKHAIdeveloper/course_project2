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
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';

export default function NewDevice({openModalHandler = () => {}, icon = 'plus'}) {
  return (
    <Grid item sm={6} md={4} xl={2} sx={{ p: 1}} onClick={() => openModalHandler()}>
        <Card variant="outlined" sx={{ width: "100%", height: "100%", minHeight: `${icon === 'plus' ? '193px' : ''}` }}>
          <CardActionArea sx={{display: 'flex', height: "100%"}}>
            {icon === 'plus' ? <AddIcon sx={{ fontSize: 100, color: 'grey' }} /> : <TuneIcon sx={{ fontSize: 100, color: 'grey' }} />}
          </CardActionArea>
        </Card>
    </Grid>
  );
}
