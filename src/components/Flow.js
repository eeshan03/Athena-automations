import Chart from 'react-google-charts';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Dropdown from './Dropdown';
import './chartstyle.css';

function Flow() {
  const [currentFlowData, setCurrentFlowData] = useState([]);
  const [past24HFlowData, setPast24HFlowData] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [showPast24HChart, setShowPast24HChart] = useState(false);
  const [deviceDataflow, setDeviceDataflow] = useState([]);


  useEffect(() => {
    fetchCurrentFlow();
  }, []);

  const fetchCurrentFlow = async () => {
    const apilink = 'http://localhost:3004/flow/current';
    const response = await Axios.get(apilink);
    const tempData = response.data.map((item) => ({
      machineId: item.DeviceId.toString(),
      temp: item.Flow,
      
    }));
    console.log('Current flow data has been received!');
    console.log(tempData);
    setCurrentFlowData(tempData);
    fetchDeviceName(tempData[0].machineId);

  };

  const fetchDeviceName = async (machineId) => {
    const apilink = `http://localhost:3004/device/${machineId}`;
    const response = await Axios.get(apilink);
    const Data = response.data.map((item) => ({
      Device: item.Machine.toString(),
    }));
    console.log(Data);
    
    setDeviceDataflow(Data);

  }


  const fetchPast24HFlow = async (machineId) => {
    const apilink = `http://localhost:3004/flow/past24h/${machineId}`;
    const response = await Axios.get(apilink);
    const temps = response.data;
    console.log(`Past 24-hour flow for DeviceId ${machineId} have been received!`);
    console.log(temps);
    let data = [['Time', 'Flow']];
    temps.forEach((temp) => {
      data.push([new Date(temp.Stamp), temp.Flow]);
    });
    console.log(data);
    setPast24HFlowData((prevData) => [...prevData, { machineId, data }]);
  };

  const handleMachineClick = (machineId) => {
    if (selectedMachines.includes(machineId)) {
      // If the machine is already selected, remove it from the selectedMachines array
      setSelectedMachines((prevMachines) => prevMachines.filter((id) => id !== machineId));
      setPast24HFlowData((prevData) => prevData.filter((data) => data.machineId !== machineId));
    } else {
      // If the machine is not selected, update the selectedMachines array with only the current machineId
      setSelectedMachines([machineId]);
      setPast24HFlowData([]);
      fetchPast24HFlow(machineId);
    }
    setShowPast24HChart(true);
  };
  

  return (
    <>
      <Sidebar />
      <Dropdown onSelect={handleMachineClick} />
      <div className='flow-data'>
      <h1 style={{ fontSize:'20px',color: 'blue'}}>Flow Analysis</h1>
        <div className='current-flow-charts'>
          {currentFlowData.map((item) => (
            <div
              key={item.machineId}
              className='current-flow-chart'
              onClick={() => handleMachineClick(item.machineId)}
            >
            {deviceDataflow.map((val) => (
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
    redTo: 150,
    yellowFrom: 75,
    yellowTo: 80,
    minorTicks: 20,
    majorTicks: ['0', '150'],
    min: 0,
    max: 150,
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
            {past24HFlowData.map((data) => (
              <div className='past-24h-chart' key={data.machineId}>
              {deviceDataflow.map((val) => (
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
                    title: `Flow over the past 24 hours (DeviceId: ${val.Device})`,
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
                      title: 'Flow',
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

export default Flow;
