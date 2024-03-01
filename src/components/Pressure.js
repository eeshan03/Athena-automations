import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Axios from "axios";
import Sidebar from "./SideBar";
import "./chartstyle.css";

function Pressure() {
  const [currentPressureData, setCurrentPressureData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [deviceDataPressure, setDeviceDataPressure] = useState({});
  const [allMachines, setAllMachines] = useState([]);

  useEffect(() => {
    fetchCurrentPressure();
  }, []);

  const fetchCurrentPressure = async () => {
    const apilink = "http://localhost:3004/pressure/current";
    const response = await Axios.get(apilink);
    const pressureData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      machineName: item.MachineName.toString(),
      temp1: item.Pressure1,
      temp2: item.Pressure2,
    }));

    setCurrentPressureData(pressureData);
    setAllMachines(pressureData); // Set all machines here

    if (pressureData.length > 0) {
      fetchDeviceName(pressureData[0].machineId, pressureData[0].machineName);
      setSelectedMachine(pressureData[0].machineId);
    }
  };

  const fetchDeviceName = async (machineId, machineName) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);

    if (response.data.length > 0) {
      const updatedDeviceData = { ...deviceDataPressure };
      updatedDeviceData[machineId] = response.data[0].Machine || machineName;
      setDeviceDataPressure(updatedDeviceData);
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

      // Fetch current pressure for the selected machine
      const apilink = `http://localhost:3004/pressure/current`;
      const response = await Axios.get(apilink);
      const pressureData = response.data.find(
        (item) => item.DeviceId === machineId
      );

      if (pressureData) {
        // Update the current pressure data state
        setCurrentPressureData([
          {
            machineId: pressureData.DeviceId,
            machineName: pressureData.MachineName,
            temp1: pressureData.Pressure1,
            temp2: pressureData.Pressure2,
          },
        ]);
      } else {
        console.error(
          `No current pressure data found for machineId ${machineId}`
        );
        setCurrentPressureData([]); // Clear the current pressure data
      }
    } catch (error) {
      console.error("Error handling machine change:", error);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="pressure-data">
        <h1 style={{ fontSize: "20px", color: "blue" }}>Pressure Analysis</h1>
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

        {selectedMachine && deviceDataPressure[selectedMachine] ? (
          <div
            className="charts-wrapper center-chart"
            style={{ margin: "10px 0" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Pressure Chart 1 */}
              <div style={{ textAlign: "center" }}>
                <Chart
                  width={200}
                  height={200}
                  chartType="Gauge"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Label", "Value"],
                    [
                      deviceDataPressure[selectedMachine],
                      parseFloat(currentPressureData[0].temp1),
                    ],
                  ]}
                  options={{
                    greenFrom: 0,
                    greenTo: 250,
                    redFrom: 450,
                    redTo: 500,
                    yellowFrom: 250,
                    yellowTo: 450,
                    minorTicks: 5,
                    majorTicks: ["0", "100", "200", "300", "400", "500"],
                    min: 0,
                    max: 500,
                  }}
                  rootProps={{ "data-testid": "1" }}
                  chartEvents={[
                    {
                      eventName: "ready",
                      callback: ({ chartWrapper }) => {
                        const chartElement = chartWrapper
                          .getChart()
                          .getContainer();
                        chartElement.classList.add("small-machine-id");
                      },
                    },
                  ]}
                />
                <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Pressure 1
                </div>
              </div>

              {/* Pressure Chart 2 */}
              <div style={{ textAlign: "center" }}>
                <Chart
                  width={200}
                  height={200}
                  chartType="Gauge"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Label", "Value"],
                    [
                      deviceDataPressure[selectedMachine],
                      parseFloat(currentPressureData[0].temp2),
                    ],
                  ]}
                  options={{
                    greenFrom: 0,
                    greenTo: 250,
                    redFrom: 450,
                    redTo: 500,
                    yellowFrom: 250,
                    yellowTo: 450,
                    minorTicks: 5,
                    majorTicks: ["0", "100", "200", "300", "400", "500"],
                    min: 0,
                    max: 500,
                  }}
                  rootProps={{ "data-testid": "2" }}
                  chartEvents={[
                    {
                      eventName: "ready",
                      callback: ({ chartWrapper }) => {
                        const chartElement = chartWrapper
                          .getChart()
                          .getContainer();
                        chartElement.classList.add("small-machine-id");
                      },
                    },
                  ]}
                />
                <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Pressure 2
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>No data available for the selected machine</div>
        )}
      </div>
    </>
  );
}

export default Pressure;
