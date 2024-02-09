import React, { useState } from "react";
import "./App.css";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import Home from "./components/Home";
import OEE from "./components/OEE";
import Flow from "./components/Flow";
import Pressure from "./components/Pressure";
import Temperature from "./components/Temperature";
import Rework from "./components/Rework";
import Rejection from "./components/Rejection";
import RPM from "./components/RPM";
import Login from "./components/Login";
import Vibration from "./components/Vibration";
import Operator from "./components/Operator";
import Maintenance from "./components/Maintenance";
import Manager from "./components/Manager";
import CreateUser from "./components/CreateUser";
import LeaveOperatorData from "./components/leaveOperatorData";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SettingMode from "./components/SettingMode";
import DataAnalysis from "./components/DataAnalysis";
import LeaveManagerData from "./components/leaveManagerData";
import LeaveHistory from "./components/LeaveHistory";

const App = () => {
  const [user, setUser] = useState({ username: '' });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({ username: '' });
  };

  return (
    <div className="app">
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <Routes>
          <Route path="/createuser" element={<CreateUser />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/Temperature" element={<Temperature />} />
          <Route path="/pressure" element={<Pressure />} />
          <Route path="/rpm" element={<RPM />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/oee" element={<OEE />} />
          <Route path="/vibration" element={<Vibration />} />
          <Route path="/rework" element={<Rework />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/rejection" element={<Rejection />} />
          <Route path="/home" element={<Home />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/operator" element={<Operator />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/setting" element={<SettingMode />} />
          <Route path="/dataAnalysis" element={<DataAnalysis />} />
          <Route path="/LeaveData" element={<LeaveManagerData />} />
          <Route path="/update-history" element={<LeaveHistory />} />
          <Route path="/LeaveOperatorData" element={<LeaveOperatorData />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
