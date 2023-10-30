import "./App.css";
import React from "react";
import Home from "./components/Home";
import OEE from "./components/OEE";
import Flow from "./components/Flow";
import Pressure from "./components/Pressure";
import Temperature from "./components/Temperature";
import Rework from "./components/Rework";
import Rejection from "./components/Rejection"
import RPM from "./components/RPM";
import Login from "./components/Login";
import Vibration from "./components/Vibration";
import Operator from "./components/Operator";
import Maintenance from "./components/Maintenance";
import Manager from "./components/Manager";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";



function App() {

  return (
    <div className="app">

      <Routes>
			<Route exact path="/" element={<Login/>} />	
 		    <Route path="/Temperature" element={<Temperature/>} />	
 		    <Route path="/pressure" element={<Pressure/>} /> 		
		    <Route path="/rpm" element={<RPM/>} />
 		    <Route path="/flow" element={<Flow/>} />	
         <Route path="/oee" element={<OEE/>} />
         <Route path="/vibration" element={<Vibration/>} />
            <Route path="/rework" element={<Rework/>} />
          <Route path="/Login" element={<Login/>} />
 		    <Route path="/rejection" element={<Rejection/>} />
         <Route path="/home" element={<Home/>} />
         <Route path="/maintenance" element={<Maintenance/>} />
         <Route path="/operator" element={<Operator/>} />
         <Route path="/manager" element={<Manager/>} />
    </Routes>
      </div>
    
  );
}

export default App;


