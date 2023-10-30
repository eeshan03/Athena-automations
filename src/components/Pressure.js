import Chart from 'react-google-charts';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Dropdown from './Dropdown';
import './chartstyle.css';

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
    const apilink = 'http://localhost:3004/pressure/current';
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      temp: item.Pressure1,
      temp1: item.Pressure2,
    }));
    console.log('Current presssure data has been received!');
    console.log(tempData);
    setCurrentPressureData(tempData);
    fetchDeviceName(tempData[0].machineId)
  };

  const fetchDeviceName = async (machineId) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);
    const Data = response.data.map((item) => ({
      Device: item.Machine.toString(),
    }));
    console.log(Data);
    
    setDeviceDatapressure(Data);

  }


  const fetchPast24HPressure = async (machineId) => {
    const apilink = `http://localhost:3004/pressure/past24h/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(`Past 24-hour presssure for DeviceId ${machineId} have been received!`);
    console.log(temps);
    let data = [['Time', 'Pressure']];
    temps.forEach((temp) => {
      data.push([new Date(temp.Stamp), temp.Pressure1]);
    });
    setPast24HpressureData((prevData) => [...prevData, { machineId, data }]);
  };

  const handleMachineClick = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) => prevMachines.filter((id) => id !== machineId));
      setPast24HpressureData((prevData) => prevData.filter((data) => data.machineId !== machineId));
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HpressureData([]);
      fetchPast24HPressure(machineId);
    }
    setShowPast24HChart(true); 
  };

  
  const fetchPast24HPressure2 = async (machineId) => {
    const apilink = `http://localhost:3004/pressure/past24h/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(`Past 24-hour presssure for DeviceId ${machineId} have been received!`);
    console.log(temps);
    let data2 = [['Time', 'Pressure2']];
    temps.forEach((temp) => {
      data2.push([new Date(temp.Stamp), temp.Pressure2]);
    });
    console.log(data2);
    setPast24HpressureData1((prevData) => [...prevData, { machineId, data2 }]);
  };

  const handleMachineClick1 = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) => prevMachines.filter((id) => id !== machineId));
      setPast24HpressureData1((prevData) => prevData.filter((data2) => data2.machineId !== machineId));
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
      <div className='pressure-data'>
      <h1 style={{ fontSize:'20px',color: 'blue'}}>Pressure Analysis</h1>
        <div className='current-pressure-charts'>
          {currentPressureData.map((item) => (
            <div
              key={item.machineId}
              className='current-pressure-chart'
              onClick={() => handleMachineClick(item.machineId)}
            >
           {deviceDatapressure.map((val) => (
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
    title:"Speed",
    greenFrom: 500,
    greenTo: 600,
    redFrom: 670,
    redTo: 700,
    yellowFrom: 600,
    yellowTo: 670,
    minorTicks: 20,
    majorTicks: ['500', '700'],
    min: 500,
    max: 700,
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
            {past24HPressureData.map((data) => (
              <div className='past-24h-chart' key={data.machineId}>
             {deviceDatapressure.map((val) => (
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
                    title: `Pressure over the past 24 hours (DeviceId: ${val.Device})`,
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
                      title: 'Pressure',
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
      <div className='pressure2-data'>
        <div className='current-pressure-charts'>
          {currentPressureData.map((item) => (
            <div
              key={item.machineId}
              className='current-pressure-chart'
              onClick={() => handleMachineClick1(item.machineId)}
            >
          {deviceDatapressure.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >      
                <Chart
  width={200}
  height={200}
  chartType="Gauge"
  loader={<div>Loading Chart</div>}
  data={[['Label', 'Value'], [val.Device, parseFloat(item.temp1)]]}
  options={{
    greenFrom: 500,
    greenTo: 600,
    redFrom: 670,
    redTo: 700,
    yellowFrom: 600,
    yellowTo: 670,
    minorTicks: 20,
    majorTicks: ['500', '700'],
    min: 500,
    max: 700,
  }}
  rootProps={{ 'data-testid': '2' }}
  chartEvents={[
    {
      eventName: 'ready',
      callback: ({ chartWrapper }) => {
        const chartElement = chartWrapper.getChart().getContainer();
        chartElement.classList.add('small-machine2-id');
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
          <div className='past-24h-charts'>
            {past24HPressure2Data.map((data2) => (
              <div className='past-24h-chart' key={data2.machineId}>
            {deviceDatapressure.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >                
                <Chart
                  width={700}
                  height={400}
                  chartType='LineChart'
                  loader={<div>Loading Chart</div>}
                  data={data2.data2}
                  options={{
                    title: `Pressure over the past 24 hours (DeviceId: ${val.Device})`,
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
                      title: 'Pressure',
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
                  rootProps={{ 'data-testid': '2' }}
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

export default Pressure;
