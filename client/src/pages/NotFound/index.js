import NotFoundImg from "../../assets/404.png";
import { Typography } from "@mui/material";


export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#aedffe",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img src={NotFoundImg} alt="404 page not found" />
      <Typography
        variant="h5"
        sx={{ position: "absolute", marginBottom: "-170px" }}
      >
        page not found
      </Typography>
    </div>
  );
}
