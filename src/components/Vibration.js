import React, { useState, useEffect } from "react";
import Axios from "axios";
import Chart from "react-google-charts";
import Sidebar from "./SideBar";
import "./Vibration.css";

function Vibration() {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [allMachines, setAllMachines] = useState([]);
  const [deviceData, setDeviceData] = useState(null);
  const [past24HVibsData, setPast24HVibsData] = useState([]);
  const [past24HVibs2Data, setPast24HVibs2Data] = useState([]);

  useEffect(() => {
    fetchMachineList();
  }, []);

  const fetchData = async (apilink, setDataCallback) => {
    try {
      const response = await Axios.get(apilink);
      const tempData = response.data.map((item) => ({
        machineId: item.DeviceId.toString(),
        meanX: item.mean_x,
        meanY: item.mean_y,
        meanZ: item.mean_z,
      }));
      setDataCallback(tempData);
      if (tempData.length > 0) {
        fetchDeviceName(tempData[0].machineId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMachineList = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3004/vibration/current"
      );
      setAllMachines(response.data);
    } catch (error) {
      console.error("Error fetching machine list:", error);
    }
  };

  const fetchDeviceName = async (machineId) => {
    try {
      const response = await Axios.get(
        `http://localhost:3004/device/${machineId}`
      );
      setDeviceData(response.data);
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  const fetchPast24HData = async (apilink, setDataCallback) => {
    try {
      const response = await Axios.get(apilink);
      const temps = response.data;
  
      console.log("Fetched Data:", temps);
  
      const data = temps.map((temp) => ({
        time: new Date(temp.currenttime),
        mean_x: parseFloat(temp.mean_x),
        mean_y: parseFloat(temp.mean_y),
        mean_z: parseFloat(temp.mean_z),
      }));
      setDataCallback((prevData) => [...prevData, { machineId: selectedMachine, data }]);
    } catch (error) {
      console.error("Error fetching past 24-hour data:", error);
    }
  };
  
  const fetchPast24HVibs = (machineId) => {
    const apilink = `http://localhost:3004/vibration/sensor1/${machineId}`;
    fetchPast24HData(apilink, setPast24HVibsData);
  };

  const fetchPast24HVibs2 = (machineId) => {
    const apilink = `http://localhost:3004/vibration/sensor2/${machineId}`;
    fetchPast24HData(apilink, setPast24HVibs2Data);
  };

  const handleMachineClick = (machineId) => {
    setSelectedMachine((prevMachine) =>
      prevMachine === machineId ? null : machineId
    );
    setPast24HVibsData([]);
    setPast24HVibs2Data([]);
    fetchPast24HVibs(machineId);
    fetchPast24HVibs2(machineId);
  };

  const renderCharts = (data1, data2) => {
    if (!deviceData || (!data1.length && !data2.length)) {
      return null; // Return early if no data or device data exists
    }

    const charts = [];

    const renderChart = (data, color, sensorName) => {
      return data.map((item) => {
        const chartData = item.data || []; // Handle empty data cases

        if (!chartData.length) {
          return null; // Don't render empty charts
        }

        const chartRows = chartData.map((rowData) => [
          new Date(rowData.time),
          rowData.mean_x,
          rowData.mean_y,
          rowData.mean_z,
        ]);

        const chartHeader = ["Time", "X", "Y", "Z"];
        const chartFormattedData = [chartHeader, ...chartRows];

        return (
          <div key={item.machineId} className="past-24h-charts">
            <div className="past-24h-chart">
              {deviceData && (
                <div key={deviceData.Device} className="current-temp-chart"> // Use deviceData directly
                  <Chart
                    width={700}
                    height={400}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={chartFormattedData}
                    options={{
                      title: `Vibration for ${sensorName} (DeviceId: ${deviceData.Device})`,
                      titleTextStyle: { color: "#388e3c", fontSize: 24, bold: true },
                      hAxis: {
                        title: "Time",
                        textStyle: { color: "#000000", fontSize: 20, bold: true },
                      },
                      vAxis: {
                        title: `Vibration`,
                        textStyle: { color: "#000000", fontSize: 20, bold: true },
                      },
                      gridlines: { color: "#EEE", count: 1 },
                      legend: { position: "none" },
                      colors: [color],
                      animation: { duration: 1000, easing: "out", startup: true },
                      tooltip: { trigger: "both" },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      });
    };

    charts.push(renderChart(data1, "#008b02", "Sensor 1"));
    charts.push(renderChart(data2, "#0951cc", "Sensor 2"));

    return charts;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3004/vibration/current");
        setAllMachines(response.data);
      } catch (error) {
        console.error("Error fetching machine list:", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <>
      <Sidebar />
      <div className="temp-data">
        <h1 style={{ fontSize: "20px", color: "blue" }}>
          Vibrational Analysis
        </h1>
        <select
          value={selectedMachine}
          onChange={(e) => handleMachineClick(e.target.value)}
        >
          <option value={null}>Select a machine</option>
          {allMachines.map((machine) => (
            <option key={machine.DeviceId} value={machine.DeviceId}>
              {machine.MachineName}
            </option>
          ))}
        </select>
        {renderCharts(past24HVibsData, past24HVibs2Data)}

      </div>
    </>
  );
}

export default Vibration;
