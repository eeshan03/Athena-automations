import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Axios from "axios";
import Sidebar from "./SideBar";
import "./chartstyle.css";

function Vibration() {
  const [currentVibrationData, setCurrentVibrationData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [deviceData, setDeviceData] = useState({});
  const [allMachines, setAllMachines] = useState([]);
  const [currentSensor, setCurrentSensor] = useState("sensor1"); // Added state for current sensor

  useEffect(() => {
    fetchCurrentVibration();
  }, []);

  const fetchCurrentVibration = async () => {
    const apilink = "http://localhost:3004/vibration/current";
    const response = await Axios.get(apilink);
    const vibrationData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      machineName: item.MachineName.toString(),
      vibrationX: item.Mean_X || item.mean_x,
      vibrationY: item.Mean_Y || item.mean_y,
      vibrationZ: item.Mean_Z || item.mean_z,
    }));

    setCurrentVibrationData(vibrationData);
    setAllMachines(vibrationData);

    if (vibrationData.length > 0) {
      fetchDeviceName(
        vibrationData[0].machineId,
        vibrationData[0].machineName
      );
      setSelectedMachine(vibrationData[0].machineId);
    }
  };

  const fetchDeviceName = async (machineId, machineName) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);

    if (response.data.length > 0) {
      const updatedDeviceData = { ...deviceData };
      updatedDeviceData[machineId] =
        response.data[0].Machine || machineName;
      setDeviceData(updatedDeviceData);
    } else {
      console.error(`No data found for machineId ${machineId}`);
    }
  };

  const fetchVibrationData = async (sensor, machineId) => {
    try {
      const apilink = `http://localhost:3004/vibration/all/${sensor}/${machineId}`;
      const response = await Axios.get(apilink);
      const vibrationData = response.data.map((item) => ({
        timestamp: item.Stamp, // Assuming "Stamp" is the timestamp column
        vibrationX:
          item[`mean_x${sensor === "sensor1" ? "" : "1"}`] ||
          item[`Mean_X${sensor === "sensor1" ? "" : "1"}`],
        vibrationY:
          item[`mean_y${sensor === "sensor1" ? "" : "1"}`] ||
          item[`Mean_Y${sensor === "sensor1" ? "" : "1"}`],
        vibrationZ:
          item[`mean_z${sensor === "sensor1" ? "" : "1"}`] ||
          item[`Mean_Z${sensor === "sensor1" ? "" : "1"}`],
      }));

      if (vibrationData.length > 0) {
        setCurrentVibrationData(vibrationData);
      } else {
        console.error(
          `No vibration data found for ${sensor} and machineId ${machineId}`
        );
        setCurrentVibrationData([]);
      }
    } catch (error) {
      console.error("Error fetching vibration data:", error);
    }
  };

  const handleMachineChange = async (machineId, machineName) => {
    try {
      setSelectedMachine(machineId);
      console.log(`Selected machine: ${machineName} (ID: ${machineId})`);
      await fetchDeviceName(machineId, machineName);
      console.log("Device data fetched successfully");

      // Fetch current vibration for the selected machine and the current sensor
      await fetchVibrationData(currentSensor, machineId);

      // Placeholder for fetching data for Vibration Sensor 2
      // Uncomment and update the code for Sensor 2 when available
      // await fetchVibrationData("sensor2", machineId);
    } catch (error) {
      console.error("Error handling machine change:", error);
    }
  };

  const handleSensorChange = async (selectedSensor) => {
    try {
      setCurrentSensor(selectedSensor);

      if (selectedMachine) {
        // Fetch vibration data for the selected machine and the new sensor
        await fetchVibrationData(selectedSensor, selectedMachine);
      }
    } catch (error) {
      console.error("Error handling sensor change:", error);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="vibration-data">
        <h1 style={{ fontSize: "20px", color: "green" }}>
          Vibration Analysis
        </h1>
        <select
          value={selectedMachine}
          onChange={(e) =>
            handleMachineChange(
              e.target.value,
              e.target.selectedOptions[0].text
            )
          }
        >
          {allMachines.map((item) => (
            <option key={item.machineId} value={item.machineId}>
              {item.machineName}
            </option>
          ))}
        </select>
        <select
          value={currentSensor}
          onChange={(e) => handleSensorChange(e.target.value)}
          style={{ marginTop: "10px" }}
        >
          <option value="sensor1">Sensor 1</option>
          <option value="sensor2">Sensor 2</option>
        </select>
        {selectedMachine && deviceData[selectedMachine] ? (
          <div className="charts-wrapper">
            {/* Vibration Sensor 1 Chart */}
            <Chart
              width={600}
              height={400}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Timestamp", "Vibration X", "Vibration Y", "Vibration Z"],
                ...currentVibrationData.map((data) => [
                  data.timestamp,
                  data.vibrationX,
                  data.vibrationY,
                  data.vibrationZ,
                ]),
              ]}
              options={{
                title: `Vibration Analysis - ${currentSensor.toUpperCase()}`,
                hAxis: { title: "Timestamp" },
                vAxis: { title: "Vibration" },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        ) : (
          <div>No data available for the selected machine</div>
        )}
      </div>
    </>
  );
}

export default Vibration;
