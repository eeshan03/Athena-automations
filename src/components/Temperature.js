import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Axios from "axios";
import Sidebar from "./SideBar";
import "./chartstyle.css";

function Temperature() {
  const [currentTempData, setCurrentTempData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [deviceData, setDeviceData] = useState({});
  const [allMachines, setAllMachines] = useState([]);

  useEffect(() => {
    fetchCurrentTemp();
  }, []);

  const fetchCurrentTemp = async () => {
    const apilink = "http://localhost:3004/temperature/current";
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      machineName: item.MachineName.toString(),
      temp: item.Temp,
    }));

    setCurrentTempData(tempData);
    setAllMachines(tempData); // Set all machines here

    if (tempData.length > 0) {
      fetchDeviceName(tempData[0].machineId, tempData[0].machineName);
      setSelectedMachine(tempData[0].machineId);
    }
  };

  const fetchDeviceName = async (machineId, machineName) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);

    if (response.data.length > 0) {
      const updatedDeviceData = { ...deviceData };
      updatedDeviceData[machineId] = response.data[0].Machine || machineName;
      setDeviceData(updatedDeviceData);
    } else {
      console.error(`No data found for machineId ${machineId}`);
    }
  };

  const handleMachineChange = async (machineId, machineName) => {
    try {
      setSelectedMachine(machineId);
      console.log(`Selected machine: ${machineName} (ID: ${machineId})`);
      await fetchDeviceName(machineId, machineName);
      console.log("Device data fetched successfully");

      // Fetch current temperature for the selected machine
      const apilink = `http://localhost:3004/temperature/current`;
      const response = await Axios.get(apilink);
      const tempData = response.data.find(
        (item) => item.DeviceId === machineId
      );

      if (tempData) {
        // Update the current temperature data state
        setCurrentTempData([
          {
            machineId: tempData.DeviceId,
            machineName: tempData.MachineName,
            temp: tempData.Temp,
          },
        ]);
      } else {
        console.error(
          `No current temperature data found for machineId ${machineId}`
        );
        setCurrentTempData([]); // Clear the current temperature data
      }
    } catch (error) {
      console.error("Error handling machine change:", error);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="temp-data">
        <h1 style={{ fontSize: "20px", color: "blue" }}>
          Temperature Analysis
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

        {selectedMachine && deviceData[selectedMachine] ? (
          <div className="charts-wrapper center-chart">
            <Chart
              width={200}
              height={200}
              chartType="Gauge"
              loader={<div>Loading Chart</div>}
              data={[
                ["Label", "Value"],
                [
                  deviceData[selectedMachine],
                  parseFloat(currentTempData[0].temp),
                ],
              ]}
              options={{
                greenFrom: 0,
                greenTo: 80,
                redFrom: 80,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 80,
                minorTicks: 20,
                majorTicks: ["0", "100"],
                min: 0,
                max: 100,
              }}
              rootProps={{ "data-testid": "1" }}
              chartEvents={[
                {
                  eventName: "ready",
                  callback: ({ chartWrapper }) => {
                    const chartElement = chartWrapper.getChart().getContainer();
                    chartElement.classList.add("small-machine-id");
                  },
                },
              ]}
            />
          </div>
        ) : (
          <div>No data available for the selected machine</div>
        )}
      </div>
    </>
  );
}

export default Temperature;
