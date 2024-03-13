import Chart from 'react-google-charts';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import './chartstyle.css';

function Flow() {
  const [currentFlowData, setCurrentFlowData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [allMachines, setAllMachines] = useState([]);

  const fetchDeviceNames = async () => {
    try {
      const apilink = 'http://localhost:3004/machineid';
      const response = await Axios.get(apilink);
      const machineData = [];

      for (const item of response.data) {
        const machineNameResponse = await Axios.get(`http://localhost:3004/machinename/${item.DeviceId}`);
        const machineName = machineNameResponse.data.MachineName || `Machine ${item.DeviceId}`;
        machineData.push({
          machineId: item.DeviceId.toString(),
          machineName,
        });
      }

      console.log('Machine data has been received!');
      console.log(machineData);
      setAllMachines(machineData);

      if (machineData.length > 0) {
        const defaultMachine = machineData[0];
        setSelectedMachine(defaultMachine);
        fetchCurrentFlow(defaultMachine.machineId);
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };

  const fetchCurrentFlow = async (machineId) => {
    try {
      const apilink = `http://localhost:3004/flow/current`;
      const response = await Axios.get(apilink);
      const tempData = response.data.find((item) => item.DeviceId === machineId);

      if (tempData) {
        // Update the current flow data state
        setCurrentFlowData([
          {
            machineId: tempData.DeviceId,
            temp: tempData.Flow,
          },
        ]);
      } else {
        console.error(`No current flow data found for machineId ${machineId}`);
        setCurrentFlowData([]); // Clear the current flow data
      }
    } catch (error) {
      console.error("Error fetching current flow data:", error);
    }
  };

  const handleMachineChange = async (machineId) => {
    try {
      const machineNameResponse = await Axios.get(`http://localhost:3004/machinename/${machineId}`);
      const machineName = machineNameResponse.data.MachineName || `Machine ${machineId}`;
      console.log(`Selected machine: ${machineName} (ID: ${machineId})`);
      setSelectedMachine({ machineId, machineName });
      fetchCurrentFlow(machineId);
    } catch (error) {
      console.error("Error fetching machine name:", error);
    }
  };

  useEffect(() => {
    fetchDeviceNames();
  }, []);

  return (
    <>
      <Sidebar />
      <div className='flow-data'>
        <h1 style={{ fontSize: '20px', color: 'blue' }}>Flow Analysis</h1>
        <select
          value={selectedMachine ? selectedMachine.machineId : ''}
          onChange={(e) =>
            handleMachineChange(e.target.value)
          }
        >
          {allMachines.map((item) => (
            <option key={item.machineId} value={item.machineId}>
              {item.machineName}
            </option>
          ))}
        </select>

        {selectedMachine && currentFlowData.length > 0 ? (
          <div className='current-flow-charts'>
            {currentFlowData.map((item) => (
              <div
                key={item.machineId}
                className='current-flow-chart'
                onClick={() => handleMachineChange(item.machineId)}
              >
                <div className='current-temp-chart'>
                  <Chart
                    width={200}
                    height={200}
                    chartType='Gauge'
                    loader={<div>Loading Chart</div>}
                    data={[['Label', 'Value'], [selectedMachine.machineName, parseFloat(item.temp)]]}
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
              </div>
            ))}
          </div>
        ) : (
          <div>No data available for the selected machine</div>
        )}
      </div>
    </>
  );
}

export default Flow;
