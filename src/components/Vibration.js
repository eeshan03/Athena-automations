import Chart from 'react-google-charts';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Dropdown from './Dropdown';
// import './chartstyle.css';
import './Vibration.css';

function Vibration() {
  const [currentVibData, setCurrentVibData] = useState([]);
  const [currentVib1Data, setCurrentVib1Data] = useState([]);
  const [past24HVibsData, setPast24HVibsData] = useState([]);
  const [past24HVibs2Data, setPast24HVibs2Data] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [showPast24HChart, setShowPast24HChart] = useState(false);
  const [showPast24HChart1, setShowPast24HChart1] = useState(false);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    fetchCurrentVib();
    fetchCurrentVib1();
    
  }, []);

  const fetchCurrentVib = async () => {
    const apilink = 'http://localhost:3004/vibration/sensor1';
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machineId: item.DeviceID.toString(),
      temp: item.mean_x,
      temp2: item.mean_y,
      temp3: item.mean_z,
    }));
    console.log('Current Vibration data has been received!');
    console.log(tempData);
    setCurrentVibData(tempData);
    fetchDeviceName(tempData[0].machineId);
  };

  const fetchCurrentVib1 = async () => {
    const apilink = 'http://localhost:3004/vibration/sensor2';
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machine: item.DeviceID.toString(),
      vib: item.mean_x1,
      vib1: item.mean_y1,
      vib2: item.mean_z1,
    }));
    console.log('Current Vibration data has been received!');
    console.log(tempData);
    setCurrentVib1Data(tempData);
    fetchDeviceName(tempData[0].machine);
  };


  const fetchPast24HVibs = async (machineId) => {
    const apilink = `http://localhost:3004/vibration/sensor1/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(`Past 24-hour temperatures for DeviceId ${machineId} have been received!`);
    console.log(temps);
    let vib = [['Time', 'X']];
    let vib1 = [['Time', 'Y']];
    let vib2 = [['Time', 'Z']];
    temps.forEach((temp) => {
      vib.push([new Date(temp.currenttime), temp.mean_x])
      vib1.push([new Date(temp.currenttime), temp.mean_y])
      vib2.push([new Date(temp.currenttime), temp.mean_z])
    });

    console.log(vib);
    setPast24HVibsData((prevData) => [...prevData, { machineId, vib, vib1, vib2}]);
  };

  const fetchPast24HVibs1 = async (machine) => {
    const apilink = `http://localhost:3004/vibration/sensor2/${machine}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(`Past 24-hour temperatures for DeviceId ${machine} have been received!`);
    console.log(temps);
    let data1 = [['Time', 'X1']];
    let data2 = [['Time', 'Y1']];
    let data3 = [['Time', 'Z1']]
    temps.forEach((temp) => {
      data1.push([new Date(temp.currenttime), temp.mean_x1])
      data2.push([new Date(temp.currenttime), temp.mean_y1])
      data3.push([new Date(temp.currenttime), temp.mean_z1])
    });

    console.log(data1);
    setPast24HVibs2Data((prevData) => [...prevData, { machine, data1, data2, data3 }]);
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
      setPast24HVibs2Data((prevData) => prevData.filter((data) => data.machineId !== machineId));
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HVibs2Data([]);
      fetchPast24HVibs(machineId);
      
    }
    setShowPast24HChart(true);
  };
  

  const handleMachineClick1 = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) => prevMachines.filter((id) => id !== machineId));
      setPast24HVibsData((prevData) => prevData.filter((data) => data.machineId !== machineId));
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HVibsData([]);
      fetchPast24HVibs1(machineId);
      
    }
    setShowPast24HChart1(true);
  };


  return (
    <>
      <Sidebar />
      <Dropdown onSelect={handleMachineClick} />
      <div className='temp-data'>
        <h1 style={{ fontSize:'20px',color: 'blue'}}>Vibrational Analysis</h1>
        <div className='sensor1'>
        <div className='vibration1-data'>
          {currentVibData.map((item) => (
            <div
              key={item.machineId}
              className='current-temp-chart'
              onClick={() => handleMachineClick(item.machineId)}
            >
            {deviceData.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >
                <h2>Vibration Sensor 1</h2>
              <h2>Device:{val.Device}</h2>
              
             </div>
  ))}
  </div>
  ))}
</div>
{/* <div className='sensor1-charts'> */}
        {selectedMachines.length > 0 && showPast24HChart && (
          <div className='past-24h-charts'>
            {past24HVibsData.map((data) => (
              <div className='past-24h-chart' key={data.machineId}>
              {deviceData.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >
                <Chart
                  width={600}
                  height={350}
                  chartType='LineChart'
                  loader={<div>Loading Chart</div>}
                  data={data.vib}
                  options={{
                    title: `Vibration  for sensor1(DeviceId: ${val.Device})`,
                    titleTextStyle: {
                      color: '#388e3c',
                      fontSize: 24,
                      bold: true,
                    },
                    hAxis: {
                      title: 'Time',
                      textStyle: {
                        color: '#000000',
                        fontSize: 20,
                        bold: true,
                      },
                    },
                    vAxis: {
                      title: 'Vibration- Xdirection',
                      textStyle: {
                        color: '#000000',
                        fontSize: 20,
                        bold: true,
                      },
                      gridlines: {
                        color: '#EEE',
                        count: 1, // display 5 gridlines
                      },
                    },
                    legend: { position: 'none' },
                    colors: ['#008b02'],
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
        {selectedMachines.length > 0 && showPast24HChart && (
          <div className='past-24h-charts'>
            {past24HVibsData.map((data) => (
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
                  data={data.vib1}
                  options={{
                    title: `Vibration  for sensor1(DeviceId: ${val.Device})`,
                    titleTextStyle: {
                      color: '#388e3c',
                      fontSize: 24,
                      bold: true,
                    },
                    hAxis: {
                      title: 'Time',
                      textStyle: {
                        color: '#000000',
                        fontSize: 20,
                        bold: true,
                      },
                    },
                    vAxis: {
                      title: 'Vibration-Ydirection',
                      textStyle: {
                        color: '#000000',
                        fontSize: 16,
                        bold: true,
                      },
                      gridlines: {
                        color: '#EEE',
                        count: 1, // display 5 gridlines
                      },
                    },
                    legend: { position: 'none' },
                    colors: ['#0951cc'],
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
        {selectedMachines.length > 0 && showPast24HChart && (
          <div className='past-24h-charts'>
            {past24HVibsData.map((data) => (
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
                  data={data.vib1}
                  options={{
                    title: `Vibration  for sensor1(DeviceId: ${val.Device})`,
                    titleTextStyle: {
                      color: '#388e3c',
                      fontSize: 24,
                      bold: true,
                    },
                    hAxis: {
                      title: 'Time',
                      textStyle: {
                        color: '#000000',
                        fontSize: 20,
                        bold: true,
                      },
                    },
                    vAxis: {
                      title: 'Vibration-Zdirection',
                      textStyle: {
                        color: '#000000',
                        fontSize: 20,
                        bold: true,
                      },
                      gridlines: {
                        color: '#EEE',
                        count: 1, // display 5 gridlines
                      },
                    },
                    legend: { position: 'none' },
                    colors: ['#db3e00'],
                    animation: {
                      duration: 1000, // animation duration in milliseconds
                      easing: 'out', // easing function for the animation
                      startup: true, // animate when the chart first loads
                    },
                    tooltip: { trigger: 'both' }, // show data points when hovered
                  }}
                  rootProps={{ 'data-testid': '3' }}
                />
                </div>
              ))}
              </div>
            ))}
          </div>
        )}
        </div>
        {/* </div> */}

      {/* gauge chart2     */}
      <div className='vibration2-data'>
        <div className='current-vibration-charts'>
          {currentVib1Data.map((item) => (
            <div
              key={item.machine}
              className='current-vibration-chart'
              onClick={() => handleMachineClick1(item.machine)}
            >
          {deviceData.map((val) => (
              <div key={val.Device} className='current-temp-chart'>  
              <h2>Vibration Sensor 2</h2>
              <h2>Device:{val.Device}</h2>
              
</div>
))}
</div>
))}
        </div>
        {selectedMachines.length > 0 && showPast24HChart1 && (
          <div className='past-24h-charts'>
            {past24HVibs2Data.map((data2) => (
              <div className='past-24h-chart' key={data2.machine}>
            {deviceData.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >                
                <Chart
                  width={700}
                  height={400}
                  chartType='LineChart'
                  loader={<div>Loading Chart</div>}
                  data={data2.data1}
                  options={{
                    title: `Vibration over the past 24 hours for sensor2 (DeviceId: ${val.Device})`,
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
                      title: 'Vibration',
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
                    colors: ['#008b02'],
                    animation: {
                      duration: 1000, // animation duration in milliseconds
                      easing: 'out', // easing function for the animation
                      startup: true, // animate when the chart first loads
                    },
                    tooltip: { trigger: 'both' }, // show data points when hovered
                  }}
                  rootProps={{ 'data-testid': '4' }}
                />
                </div>
            ))}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedMachines.length > 0 && showPast24HChart1 && (
          <div className='past-24h-charts'>
            {past24HVibs2Data.map((data2) => (
              <div className='past-24h-chart' key={data2.machine}>
            {deviceData.map((val) => (
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
                    title: `Vibration over the past 24 hours for sensor2 (DeviceId: ${val.Device})`,
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
                      title: 'Vibration',
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
                    colors: ['#0951cc'],
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
        {selectedMachines.length > 0 && showPast24HChart1 && (
          <div className='past-24h-charts'>
            {past24HVibs2Data.map((data2) => (
              <div className='past-24h-chart' key={data2.machine}>
            {deviceData.map((val) => (
              <div key={val.Device}
              className='current-temp-chart'
              >                
                <Chart
                  width={700}
                  height={400}
                  chartType='LineChart'
                  loader={<div>Loading Chart</div>}
                  data={data2.data3}
                  options={{
                    title: `Vibration over the past 24 hours for sensor2 (DeviceId: ${val.Device})`,
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
                      title: 'Vibration',
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
                    colors: ['#db3e00'],
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
      
      
  
      
    </>
  );
}

export default Vibration;
