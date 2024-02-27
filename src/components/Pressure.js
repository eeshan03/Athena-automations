import Chart from "react-google-charts";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Dropdown from "./Dropdown";
import "./chartstyle.css";

function Pressure() {
  const [currentPressureData, setCurrentPressureData] = useState([]);
  const [past24HPressureData, setPast24HpressureData] = useState([]);
  const [past24HPressure2Data, setPast24HpressureData1] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [showPast24HChart, setShowPast24HChart] = useState(false);
  const [showPast24HChart1, setShowPast24HChart1] = useState(false);
  const [deviceDatapressure, setDeviceDatapressure] = useState([]);

  useEffect(() => {
    fetchCurrentPresure();
  }, []);

  const fetchCurrentPresure = async () => {
    const apilink = "http://localhost:3004/pressure/current";
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      machineName: item.MachineName.toString(),
      temp: item.Pressure1,
      temp1: item.Pressure2,
    }));
    console.log("Current presssure data has been received!");
    console.log(tempData);
    setCurrentPressureData(tempData);
    fetchDeviceName(tempData[0].machineId);
  };

  const fetchDeviceName = async (machineId, machineName) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);
    const Data = response.data.map((item) => ({
      Device: item.Machine ? item.Machine.toString() : `${machineName}`,
    }));
    console.log(Data);

    setDeviceDatapressure(Data);
  };

  const fetchPast24HPressure = async (machineId, machineName) => {
    const apilink = `http://localhost:3004/pressure/past24h/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(
      `Past 24-hour presssure for DeviceId ${machineId} have been received!`
    );
    console.log(temps);
    let data = [["Time", "Pressure"]];
    temps.forEach((temp) => {
      data.push([new Date(temp.Stamp), temp.Pressure1]);
    });
    setPast24HpressureData((prevData) => [
      ...prevData,
      { machineId, machineName, data },
    ]);
  };

  const handleMachineClick = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) =>
        prevMachines.filter((id) => id !== machineId)
      );
      setPast24HpressureData((prevData) =>
        prevData.filter((data) => data.machineId !== machineId)
      );
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HpressureData([]);
      fetchPast24HPressure(machineId);
    }
    setShowPast24HChart(true);
  };

  const fetchPast24HPressure2 = async (machineId, machineName) => {
    const apilink = `http://localhost:3004/pressure/past24h/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(
      `Past 24-hour presssure for DeviceId ${machineId} have been received!`
    );
    console.log(temps);
    let data2 = [["Time", "Pressure2"]];
    temps.forEach((temp) => {
      data2.push([new Date(temp.Stamp), temp.Pressure2]);
    });
    console.log(data2);
    setPast24HpressureData1((prevData) => [
      ...prevData,
      { machineId, machineName, data2 },
    ]);
  };

  const handleMachineClick1 = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) =>
        prevMachines.filter((id) => id !== machineId)
      );
      setPast24HpressureData1((prevData) =>
        prevData.filter((data2) => data2.machineId !== machineId)
      );
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HpressureData1([]);
      fetchPast24HPressure2(machineId);
    }
    setShowPast24HChart1(true);
  };

  return (
    <>
      <Sidebar />
      <Dropdown onSelect={handleMachineClick} />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ fontSize: "20px", color: "blue" }}>Pressure Analysis</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {currentPressureData.map((item) => (
            <div
              key={item.machineId}
              style={{ margin: "10px", cursor: "pointer" }}
              onClick={() => handleMachineClick(item.machineId)}
            >
              {deviceDatapressure.map((val) => (
                <div key={val.Device} style={{ margin: "5px" }}>
                  <Chart
                    width={200}
                    height={200}
                    chartType="Gauge"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Label", "Value"],
                      [val.Device, parseFloat(item.temp)],
                    ]}
                    options={{
                      greenFrom: 0,
                      greenTo: 250, // Adjust this value based on your pressure range
                      redFrom: 450, // Adjust this value based on your pressure range
                      redTo: 500,
                      yellowFrom: 250, // Adjust this value based on your pressure range
                      yellowTo: 450, // Adjust this value based on your pressure range
                      minorTicks: 5, // Adjust this value based on your requirements
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
                </div>
              ))}
            </div>
          ))}
        </div>
        {selectedMachines.length > 0 && showPast24HChart && (
          <div style={{ marginTop: "20px" }}>
            {past24HPressureData.map((data) => (
              <div key={data.machineId} style={{ marginBottom: "20px" }}>
                {deviceDatapressure.map((val) => (
                  <div key={val.Device} style={{ marginBottom: "10px" }}>
                    <Chart
                      width={700}
                      height={400}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={data.data}
                      options={{
                        title: `Pressure over the past 24 hours (DeviceId: ${val.Device}})`,
                        titleTextStyle: {
                          color: "#388e3c",
                          fontSize: 24,
                          bold: true,
                        },
                        hAxis: {
                          title: "Time",
                          textStyle: {
                            color: "#000000",
                            fontSize: 16,
                            bold: true,
                          },
                        },
                        vAxis: {
                          title: "Pressure",
                          textStyle: {
                            color: "#000000",
                            fontSize: 16,
                            bold: true,
                          },
                          gridlines: {
                            color: "#EEE",
                            count: 5,
                          },
                        },
                        legend: { position: "none" },
                        colors: ["#f44336"],
                        animation: {
                          duration: 1000,
                          easing: "out",
                          startup: true,
                        },
                        tooltip: { trigger: "both" },
                      }}
                      rootProps={{ "data-testid": "1" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {currentPressureData.map((item) => (
              <div
                key={item.machineId}
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => handleMachineClick1(item.machineId)}
              >
                {deviceDatapressure.map((val) => (
                  <div key={val.Device} style={{ margin: "5px" }}>
                    <Chart
                      width={200}
                      height={200}
                      chartType="Gauge"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ["Label", "Value"],
                        [val.Device, parseFloat(item.temp1)],
                      ]}
                      options={{
                        greenFrom: 0,
                        greenTo: 250, // Adjust this value based on your pressure range
                        redFrom: 450, // Adjust this value based on your pressure range
                        redTo: 500,
                        yellowFrom: 250, // Adjust this value based on your pressure range
                        yellowTo: 450, // Adjust this value based on your pressure range
                        minorTicks: 5, // Adjust this value based on your requirements
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
                            chartElement.classList.add("small-machine2-id");
                          },
                        },
                      ]}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {selectedMachines.length > 0 && showPast24HChart1 && (
            <div style={{ marginTop: "20px" }}>
              {past24HPressure2Data.map((data2) => (
                <div key={data2.machineId} style={{ marginBottom: "20px" }}>
                  {deviceDatapressure.map((val) => (
                    <div key={val.Device} style={{ marginBottom: "10px" }}>
                      <Chart
                        width={700}
                        height={400}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={data2.data2}
                        options={{
                          title: `Pressure over the past 24 hours (DeviceId: ${val.Device})`,
                          titleTextStyle: {
                            color: "#388e3c",
                            fontSize: 24,
                            bold: true,
                          },
                          hAxis: {
                            title: "Time",
                            textStyle: {
                              color: "#000000",
                              fontSize: 16,
                              bold: true,
                            },
                          },
                          vAxis: {
                            title: "Pressure",
                            textStyle: {
                              color: "#000000",
                              fontSize: 16,
                              bold: true,
                            },
                            gridlines: {
                              color: "#EEE",
                              count: 5,
                            },
                          },
                          legend: { position: "none" },
                          colors: ["#f44336"],
                          animation: {
                            duration: 1000,
                            easing: "out",
                            startup: true,
                          },
                          tooltip: { trigger: "both" },
                        }}
                        rootProps={{ "data-testid": "2" }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Pressure;
