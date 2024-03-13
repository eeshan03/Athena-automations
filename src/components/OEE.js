import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "react-circular-progressbar/dist/styles.css";
import "./OEE.css";
import Sidebar from "./SideBar";
import axios from "axios";

const CustomLegend = ({ data }) => (
  <div className="legend-container">
    {data.map(({ name, fill }) => (
      <div key={name} className="legend-item">
        <span className="legend-color" style={{ backgroundColor: fill }} />
        <span className="legend-label">{name}</span>
      </div>
    ))}
  </div>
);


const OEE = () => {
  const [oeeData, setOEEData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [machineList, setMachineList] = useState([]);

  useEffect(() => {
    fetchOEEData();
    fetchMachineList();
  }, []);

  useEffect(() => {
    console.log("oeeData:", oeeData);
  }, [oeeData]);

  const fetchOEEData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/oee");
      console.log("oee", response.data); // Logging fetched data
      setOEEData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMachineList = async () => {
    try {
      const response = await axios.get("http://localhost:3010/machines");
      setMachineList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  return (
    <div>
      <Sidebar />
      <h1>Overall Equipment Effectiveness</h1>

      <div className="select-dropdown">
        <select value={selectedMachine} onChange={handleMachineChange}>
          <option value="">Select Machine</option>
          {machineList.map((machine) => (
            <option key={machine.DeviceId} value={machine.DeviceId}>
              {machine.MachineName}
            </option>
          ))}
        </select>
      </div>

      <div className="oee-container">
        {oeeData
          .filter((data) => selectedMachine === data.DeviceId)
          .map((data) => (
            <div
              key={data.DeviceId}
              className="mainoee"
              style={{
                display: selectedMachine === data.DeviceId ? "block" : "none",
              }}
            >
              <div className="machinex">
                <h3 className="machine-id">Machine ID: {data.MachineName}</h3>
                <div className="chart-container">
                  {/* Radial chart */}
                  <div className="chart-wrapper">
                    <div className="radial-chart-container">
                      <div
                        className="radialBar"
                        style={{
                          marginTop: "10px",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgressbar
                          value={data.oee || 0}
                          text={`${data.oee}%`}
                          styles={buildStyles({
                            textSize: "24px",
                            pathColor: `rgba(18, 223, 42, ${data.oee / 100})`, // Green color
                            textColor: "#000",
                            trailColor: "#d6d6d6",
                            pathRadius: "30%",
                            trailRadius: "40%",
                          })}
                        />
                        <h5
                          className="chart-heading"
                          style={{
                            marginLeft: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          OEE Value
                        </h5>
                      </div>
                    </div>
                  </div>
                  {/* Bar chart */}
                  <div className="chart-wrapper">
                    <div className="bar-chart-container">
                      <BarChart
                        width={400} 
                        height={300}
                        data={[
                          {
                            name: "Availability",
                            value: data.Availability,
                            fill: "#1f77b4", // Unique color for Availability
                          },
                          {
                            name: "Performance",
                            value: data.Performance,
                            fill: "#ff7f0e", // Unique color for Performance
                          },
                          {
                            name: "Quality",
                            value: data.Quality,
                            fill: "#2ca02c", // Unique color for Quality
                          },
                        ]}
                        margin={{
                          top: 5,
                          right: 20,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          interval={0} // Display all labels without overlapping
                          tick={({ payload }) => (
                            <text
                              x={payload.x}
                              y={payload.y + 10}
                              fill={payload.fill}
                              textAnchor="middle"
                            >
                              {payload.value}
                            </text>
                          )}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" />
                      </BarChart>
                      <h5
                        className="chart-heading"
                        style={{ textAlign: "center" }}
                      >
                        OEE Components
                      </h5>
                      <CustomLegend
                        data={[
                          {
                            name: "Availability",
                            fill: "#1f77b4",
                          },
                          {
                            name: "Performance",
                            fill: "#ff7f0e",
                          },
                          {
                            name: "Quality",
                            fill: "#2ca02c",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OEE;
