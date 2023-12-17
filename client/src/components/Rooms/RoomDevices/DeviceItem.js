import { Card, CardActionArea, Grid, Typography } from "@mui/material";

export default function DeviceItem({ device }) {
  return (
    <Grid item sm={6} md={4} xl={2} sx={{ p: 1 }}>
      <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
        <CardActionArea sx={{ display: "flex", height: "100%" }}>
          <Typography variant="p" component="body" sx={{ textAlign: "center" }}>
            {device.name}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
