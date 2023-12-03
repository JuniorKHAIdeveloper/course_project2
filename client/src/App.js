import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Dashboard from "./pages/Dashboard";
import Devices from "./components/Devices";
import Registration from "./pages/Registration";
import AppContextProvider from "./storage";

function App() {
  return (
    <div>
      <AppContextProvider>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="account" element={<div>Account</div>} />
          <Route path="devices" element={<Devices />} />
          <Route path="rooms" element={<div>Rooms</div>} />
        </Route>
        <Route path="*" element={<div>Not found 404</div>} />
      </Routes>
      </AppContextProvider>
    </div>
  );
}

export default App;
