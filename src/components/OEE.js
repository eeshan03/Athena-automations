import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';
import './OEE.css';
import Sidebar from './SideBar';
import axios from 'axios';

const OEEContainer = () => {
  const [oeeData, setOEEData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(() => {
    fetchOEEData();
  }, []);

  const fetchOEEData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/oee');
      console.log('oee', response);
      setOEEData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLineGraph = (DeviceId) => {
    setSelectedMachine(selectedMachine === DeviceId ? null : DeviceId);
  };

  return (
    <>
      <div className='oee-container'>
        {oeeData.map((data) => (
          <div key={data.Machine_ID} className='mainoee'>
            <div className='machinex'>
              <h3 className='machine-id'>Machine ID: {data.MachineName}</h3>
              <div className='chart-container'>
                <div className='radial-chart-container'>
                  {/* Circular progressbar displaying OEE */}
                  <div className='radialBar' style={{ marginTop: '10px', alignItems: 'center' }}>
                    <CircularProgressbar
                      value={data.oee || 0}
                      text={`${data.oee}%`}
                      styles={buildStyles({
                        textSize: '24px',
                        pathColor: `rgba(18, 223, 42, ${data.oee / 100})`, // Green color
                        textColor: '#000',
                        trailColor: '#d6d6d6',
                        pathRadius: '30%',
                        trailRadius: '40%',
                      })}
                    />
                    <h5 className='chart-heading' style={{ marginLeft: '5px', marginTop: '-5px' }}>
                      OEE Value
                    </h5>
                  </div>
                  <button onClick={() => toggleLineGraph(data.DeviceId)} className='toggle-button'>
                    {selectedMachine === data.DeviceId ? 'Hide Line Graph' : 'Show Line Graph'}
                  </button>
                </div>

                {selectedMachine === data.DeviceId && (
                  <div className='line-chart-container'>
                    {/* Line chart to visualize data */}
                    <LineChart width={400} height={300} data={oeeData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='DeviceId' />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type='monotone' dataKey='Availability' stroke='#8884d8' />
                      <Line type='monotone' dataKey='Performance' stroke='#82ca9d' />
                      <Line type='monotone' dataKey='Quality' stroke='#ffc658' />
                    </LineChart>
                    <h5 className='chart-heading' style={{ textAlign: 'center' }}>
                      OEE Components Over Time
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const OEE = () => {
  return (
    <div>
      <Sidebar />
      <h1>Overall Equipment Effectiveness</h1>
      <OEEContainer />
    </div>
  );
};

export default OEE;
