import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Axios from "axios";
import Sidebar from "./SideBar";
import "./chartstyle.css";

function RPM() {
  const [rpmData, setRpmData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [deviceData, setDeviceData] = useState({});
  const [allMachines, setAllMachines] = useState([]);

  useEffect(() => {
    fetchCurrentRpm();
    fetchMachineData(); // Call fetchMachineData when component mounts
  }, []);

  const fetchCurrentRpm = async () => {
    const apilink = "http://localhost:3004/rpm/current";
    console.log("Requesting current RPM data from:", apilink); // Log the request URL
    try {
      const response = await Axios.get(apilink);
      const tempData = response.data.map((item) => ({
        machineId: item.DeviceId.toString(),
        rpm: item.RPM,
      }));
  
      if (tempData.length > 0) {
        console.log("Current RPM data has been received!");
        console.log(tempData);
        setRpmData(tempData);
        setSelectedMachine(tempData[0].machineId); // Select the first machine by default
      } else {
        console.error("No current RPM data found.");
      }
    } catch (error) {
      console.error("Error fetching current RPM data:", error);
    }
  };
  

  const fetchMachineData = async () => {
    try {
      const response = await Axios.get("http://localhost:3004/machinesRPM");
      console.log("Machine data received:", response.data); // Log the machine data
      setAllMachines(response.data); // Set machine data to allMachines state
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };

  const fetchDeviceName = async (machineId) => {
    try {
      const response = await Axios.get(`http://localhost:3004/device/${machineId}`);
      console.log("Response from device API:", response.data);
      if (response.data.length > 0) {
        return response.data[0].MachineName; // Update to access MachineName property
      } else {
        console.error(`No data found for machineId ${machineId}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching device name:", error);
      return null;
    }
  };
  
  
  useEffect(() => {
    if (selectedMachine) {
      fetchDeviceName(selectedMachine).then((machineName) => {
        console.log("Device name received:", machineName); // Log the device name
        if (machineName) {
          setDeviceData({ ...deviceData, [selectedMachine]: machineName });
        }
      });
    }
  }, [selectedMachine]);

  const handleMachineChange = (machineId) => {
    console.log("Selected machine:", machineId); // Log the selected machine
    setSelectedMachine(machineId);
  };

  const rpmValue = rpmData.find(function (item) {
    return item.machineId === selectedMachine;
  });
  const rpm = rpmValue ? parseFloat(rpmValue.rpm) : 0;

  return (
    <>
      <Sidebar />

      <div className="rpm-data">
        <h1 style={{ fontSize: "20px", color: "blue" }}>RPM Analysis</h1>
        <select
          value={selectedMachine}
          onChange={(e) => handleMachineChange(e.target.value)}
        >
          {allMachines.map((item) => (
            <option key={item.DeviceId} value={item.DeviceId}>
              {item.MachineName}
            </option>
          ))}
        </select>

        {selectedMachine && deviceData[selectedMachine] ? (
          <div className="charts-wrapper center-chart" style={{ margin: "10px 0" }}>
            <div style={{ textAlign: "center" }}>
              <Chart
                width={200}
                height={200}
                chartType="Gauge"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Label", "Value"],
                  [deviceData[selectedMachine], rpm],
                ]}
                options={{
                  greenFrom: 0,
                  greenTo: 500,
                  redFrom: 1200,
                  redTo: 1500,
                  yellowFrom: 500,
                  yellowTo: 1200,
                  minorTicks: 20,
                  majorTicks: ["0", "1500"],
                  min: 0,
                  max: 1500,
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
              <div style={{ fontWeight: "bold", marginTop: "10px" }}>RPM</div>
            </div>
          </div>
        ) : (
          <div>No data available for the selected machine</div>
        )}
      </div>
    </>
  );
}

export default RPM;
