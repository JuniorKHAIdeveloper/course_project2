import Typography from "@mui/material/Typography";


export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"All rights reserved © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
