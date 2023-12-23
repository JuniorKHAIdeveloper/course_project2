import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, ToggleButton, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import placeholderSvg from "../../../assets/clean-room.svg";
import { AppContext } from "../../../storage";
import RoomDevices from "../RoomDevices";


export default function Room({ data, setOpen }) {
  const { user, setAlert, updateRooms } = useContext(AppContext);
  let navigate = useNavigate();
  function clickHandler() {
    navigate(`${data._id}`);
  }

  const roomDeleteHandler = async (e, roomId) => {
    e.stopPropagation();
    const formData = {
      userId: user.id.id,
      roomId,
    };

    const apiUrl = "/app/room";
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      updateRooms(user);
      setAlert({ message: "Room deleted!", type: "success" });
    } catch (error) {
      setAlert({ message: "Room not created!", type: "error" });
      console.error("Error:", error.message);
    }
  };

  return (
    <Card variant="outlined" sx={{ display: "flex", mt: 2 }}>
      <div style={{ flex: 1, cursor: "pointer" }} onClick={clickHandler}>
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
              position: "relative",
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
            <ToggleButton
              sx={{
                right: "10px",
                bottom: "10px",
                background: "rgb(240, 240, 240, 0.8)",
                position: "absolute",
              }}
              onClick={(e) => roomDeleteHandler(e, data._id)}
            >
              <DeleteIcon />
            </ToggleButton>
          </Box>
        )}
      </div>
      <div style={{ flex: 3 }}>
        <RoomDevices openModalHandler={setOpen} room={data} />
      </div>
    </Card>
  );
}
