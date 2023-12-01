import React, { useEffect, useState } from "react";
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

export default function Devices() {
  const [devices, setDevices] = useState([]);

  async function fetchDevices() {
    const apiUrl = "/iot/tenant/deviceInfos";

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.json();

      return data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDevices();
      setDevices(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid container spacing={0} sx={{ m: 0, width: "100%" }}>
        {devices?.map((device) => (
          <Grid item sm={6} md={4} xl={2} sx={{ p: 1 }}>
            <Badge
              badgeContent=""
              color={`${device.active ? "success" : "error"}`}
              sx={{ width: "100%" }}
            >
              <Card variant="outlined" sx={{width: '100%'}}>
                <CardActionArea>
                  <CardMedia component="div" height="140" alt="green iguana">
                    <SettingsRemoteIcon
                      sx={{ width: "100%", height: "100px" }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      {device.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                  </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Badge>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
