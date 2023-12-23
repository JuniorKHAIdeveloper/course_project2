import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import { Card, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";


export default function NewDevice({
  openModalHandler = () => {},
  icon = "plus",
}) {
  return (
    <Grid
      item
      sm={6}
      md={4}
      xl={2}
      sx={{ p: 1 }}
      onClick={() => openModalHandler()}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          height: "100%",
          minHeight: `${icon === "plus" ? "193px" : ""}`,
          aspectRatio: "1/1",
        }}
      >
        <CardActionArea sx={{ display: "flex", height: "100%" }} id="add-icon">
          {icon === "plus" ? (
            <AddIcon sx={{ fontSize: 100, color: "grey" }} />
          ) : (
            <TuneIcon sx={{ fontSize: 100, color: "grey" }} />
          )}
        </CardActionArea>
      </Card>
    </Grid>
  );
}
