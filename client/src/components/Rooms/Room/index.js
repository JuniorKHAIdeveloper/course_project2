import {useContext} from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import placeholderSvg from "../../../assets/clean-room.svg";
import RoomDevices from "../RoomDevices";
import { AppContext } from "../../../storage";
import ModalAddDevice from "../ModalAddDevice";
import { useNavigate } from "react-router-dom";

export default function Room({ data, setOpen }) {
  let navigate = useNavigate();
  function clickHandler() {
    navigate(`${data._id}`)
  }
  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", mt: 2 }}
    >
      <div style={{ flex: 1, cursor: 'pointer' }} onClick={clickHandler}>
        {data.image ? (
          <Box
          sx={{
              background: `url(${data.image}) center/cover no-repeat`,
              width: "100%",
              aspectRatio: "2/1",
              pt: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                background: "rgb(240, 240, 240, 0.8)",
                display: "inline",
              }}
            >
              {data.name}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              background: `url(${placeholderSvg}) center/cover no-repeat`,
              width: "100%",
              aspectRatio: "2/1",
              pt: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                background: "rgb(240, 240, 240, 0.8)",
                display: "inline",
              }}
            >
              {data.name}
            </Typography>
          </Box>
        )}
      </div>
      <div style={{ flex: 3 }}>
        <RoomDevices openModalHandler={setOpen} room={data} />
      </div>
    </Card>
  );
}
