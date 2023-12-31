import { Typography } from "@mui/material";
import BrainBulbImg from "../../assets/digital-brain.png";


export default function Logo({ size = "normal" }) {
  return (
    <>
      {size === "normal" ? (
        <div
          id="logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={BrainBulbImg}
            style={{ height: "108px", display: "inline-block" }}
          />
          <Typography variant="h2" style={{ display: "inline-block" }}>
            <span
              style={{
                color: "#0036d1",
                display: "block",
                marginBottom: "-11px",
              }}
            >
              Web
            </span>
            <span style={{ color: "#00e9bc", display: "block" }}>House</span>
          </Typography>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            marginLeft: "-20px",
          }}
        >
          <img
            src={BrainBulbImg}
            style={{ height: "40px", display: "inline-block" }}
          />
          <Typography variant="h5" style={{ display: "inline-block" }}>
            <span
              style={{
                color: "#0036d1",
                marginBottom: "-11px",
              }}
            >
              Web
            </span>
            <span style={{ color: "#00e9bc" }}>House</span>
          </Typography>
        </div>
      )}
    </>
  );
}
