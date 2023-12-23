import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Card, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";


export default function NewRoom({ openModalHandler = () => {} }) {
  return (
    <Grid
      item
      sm={6}
      md={4}
      xl={2}
      sx={{ my: 2 }}
      onClick={() => openModalHandler()}
    >
      <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
        <CardActionArea sx={{ display: "flex", height: "100%" }} id="new-room">
          <AddIcon sx={{ fontSize: 100, color: "grey" }} />
        </CardActionArea>
      </Card>
    </Grid>
  );
}
