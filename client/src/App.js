import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Dashboard from "./pages/Dashboard";
import Devices from "./components/Devices";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="account" element={<div>Account</div>} />
          <Route path="devices" element={<Devices />} />
          <Route path="rooms" element={<div>Rooms</div>} />
        </Route>
        <Route path="*" element={<div>Not found 404</div>} />
      </Routes>
    </div>
  );
}

export default App;
