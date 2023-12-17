import { Box, Container, Typography } from "@mui/material";
import React from "react";
import iotDevicesGif from "../../assets/iot_devices.gif";

export default function AboutUs() {
  return (
    <Box sx={{p: 2}}>
      <Typography component="h3" variant="h5" sx={{mb: 2, textAlign: 'center'}}>
      Тема: «Веб-застосунок для відображення даних з IoT пристроїв».
        </Typography>
      <img src={iotDevicesGif} alt="IoT devices" style={{ margin: '0 auto', height: "500px", display: 'flex', borderRadius: '4px' }} />
      <Typography component="h3" variant="h5" sx={{mt: 2, textAlign: 'center'}}>
        Основою для розробки є завдання курсового проекту з дисципліни
        «Програмування систем IoT» кафедри комп'ютерних систем, мереж і
        кібербезпеки Національного аерокосмічного університету ім. М.Є.
        Жуковського "Харківський авіаційний інститут". 
        </Typography>
    </Box>
  );
}
