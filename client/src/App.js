import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Dashboard from "./pages/Dashboard";
import Devices from "./components/Devices";
import Registration from "./pages/Registration";
import AppContextProvider from "./storage";
import Rooms from "./components/Rooms";
import RoomTelemetry from "./components/RoomTelemetry";
import Alerts from "./components/Alerts";
import AboutUs from "./components/AboutUs";
import Account from "./components/Account";

function App() {
  return (
    <div>
      <AppContextProvider>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="account" element={<Account />} />
          <Route path="devices" element={<Devices />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:roomId" element={<RoomTelemetry />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
        <Route path="*" element={<div>Not found 404</div>} />
      </Routes>

      <Alerts />
      </AppContextProvider>
    </div>
  );
}

export default App;
