import Chart from 'react-google-charts';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Dropdown from './Dropdown';
import './chartstyle.css';

function Temperature() {
  const [currentTempData, setCurrentTempData] = useState([]);
  const [past24HTempsData, setPast24HTempsData] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [showPast24HChart, setShowPast24HChart] = useState(false);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    fetchCurrentTemp();
    
  }, []);

  const fetchCurrentTemp = async () => {
    const apilink = 'http://localhost:3004/temperature/current';
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      temp: item.Temp,
      temp2: item.Humidity
    }));
    console.log('Current temperature data has been received!');
    console.log(tempData);
    setCurrentTempData(tempData);
    fetchDeviceName(tempData[0].machineId);
  };

  const fetchPast24HTemps = async (machineId) => {
    const apilink = `http://localhost:3004/temperature/past24h/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(`Past 24-hour temperatures for DeviceId ${machineId} have been received!`);
    console.log(temps);
    let data = [['Time', 'Temperature']];
    temps.forEach((temp) => {
      data.push([new Date(temp.Stamp), temp.Temp]);
    });
    console.log(data);
    setPast24HTempsData((prevData) => [...prevData, { machineId, data }]);
  };


  const fetchDeviceName = async (machineId) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);
    const Data = response.data.map((item) => ({
      Device: item.Machine.toString(),
    }));
    console.log(Data);
    
    setDeviceData(Data);

  }

  const handleMachineClick = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) => prevMachines.filter((id) => id !== machineId));
      setPast24HTempsData((prevData) => prevData.filter((data) => data.machineId !== machineId));
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HTempsData([]);
      fetchPast24HTemps(machineId);
      
    }
    setShowPast24HChart(true);
  };
  

  return (
    <>
      <Sidebar />
      <Dropdown onSelect={handleMachineClick} />
      <div className='temp-data'>
        <h1 style={{ fontSize:'20px',color: 'blue'}}>Temperature Analysis</h1>
        <div className='current-temp-charts'>
          {currentTempData.map((item) => (
            <div
              key={item.machineId}
              className='current-temp-chart'
              onClick={() => handleMachineClick(item.machineId)}
            >
            {deviceData.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >
              <Chart
  width={200}
  height={200}
  chartType="Gauge"
  loader={<div>Loading Chart</div>}
  data={[['Label', 'Value'], [val.Device, parseFloat(item.temp)]]}
  options={{
    greenFrom: 0,
    greenTo: 80,
    redFrom: 80,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 80,
    minorTicks: 20,
    majorTicks: ['0', '100'],
    min: 0,
    max: 100,
  }}
  rootProps={{ 'data-testid': '1' }}
  chartEvents={[
    {
      eventName: 'ready',
      callback: ({ chartWrapper }) => {
        const chartElement = chartWrapper.getChart().getContainer();
        chartElement.classList.add('small-machine-id');
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
          <div className='past-24h-charts'>
            {past24HTempsData.map((data) => (
              <div className='past-24h-chart' key={data.machineId}>
              {deviceData.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >
                <Chart
                  width={700}
                  height={400}
                  chartType='LineChart'
                  loader={<div>Loading Chart</div>}
                  data={data.data}
                  options={{
                    title: `Temperature over the past 24 hours (DeviceId: ${val.Device})`,
                    titleTextStyle: {
                      color: '#388e3c',
                      fontSize: 24,
                      bold: true,
                    },
                    hAxis: {
                      title: 'Time',
                      textStyle: {
                        color: '#000000',
                        fontSize: 16,
                        bold: true,
                      },
                    },
                    vAxis: {
                      title: 'Temperature',
                      textStyle: {
                        color: '#000000',
                        fontSize: 16,
                        bold: true,
                      },
                      gridlines: {
                        color: '#EEE',
                        count: 5, // display 5 gridlines
                      },
                    },
                    legend: { position: 'none' },
                    colors: ['#f44336'],
                    animation: {
                      duration: 1000, // animation duration in milliseconds
                      easing: 'out', // easing function for the animation
                      startup: true, // animate when the chart first loads
                    },
                    tooltip: { trigger: 'both' }, // show data points when hovered
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
                </div>
              ))}
              </div>
            ))}
          </div>
        )}
      </div>
      
    </>
  );
}

export default Temperature;
